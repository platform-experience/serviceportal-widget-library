// populate the 'data' variable with catalog item, variables, and variable view
(function () {

  options.url = options.url || 'id={page}&is_new_order=true&table={table}&sys_id={sys_id}';
  options.disable_req_for = options.disable_req_for || true;
  // Comma separated fields to display in snRecordPicker directive
  options.reqForDispCols = options.reqForDispCols || 'name';
  options.reqForQuery = options.reqForQuery || 'active=true';
  // Comma separated fields to search for in snRecordPicker directive
  options.reqForSearchCols = options.reqForSearchCols || 'name';

  if (input && input.action === 'log_request') {
    $sp.logStat('Cat Item Request', input.itemDetails.sys_class_name, input.itemDetails.sys_id, input.itemDetails.name);
    return;
  }

  // Are we using a two-step checkout process?
  data.sys_properties = {
    twostep: gs.getProperty("glide.sc.sp.twostep", "true") == 'true'
    //twostep: false
  };

  // Define our initial set of choices and value for the quantity field
  var clGenerator = new GlideChoiceList();
  var choiceListQuantity = clGenerator.getChoiceList("sc_cart_item", "quantity");
  var choicelistQuantityData = [];
  //Function call changed from size() to getSize() for ScopedChoiceList
  for (var i = 0; i < choiceListQuantity.getSize(); i++) {
    //Function call changed from get() to getChoice() for ScopedChoiceList
    var choice = choiceListQuantity.getChoice(i);
    if (!isNaN(choice.getValue()))
      choicelistQuantityData.push({ value: parseInt(choice.getValue()), label: choice.getLabel() });
  }
  data.choiceListQuantity = choicelistQuantityData;
  data.quantity = choicelistQuantityData[0].value;

  // Are we editing an item from the cart? If so, populate our data based on the original item
  var edit_parm = $sp.getParameter('edit');
  data.is_cart_item = edit_parm == 'cart';

  var cartName = data.is_cart_item ? 'DEFAULT' : 'saved_items';
  var cart = new sn_sc.CartJS(cartName);
  data.requestedFor = {value: gs.getUser().getID(), displayValue: gs.getUser().getDisplayName()};


  if (edit_parm) {
    var cart_item_id = $sp.getParameter("sys_id");
    var gr = new GlideRecord("sc_cart_item");
    if (!gr.get(cart_item_id) || gr.cart != cart.getCartID()) {
      data.recordFound = false;
      return;
    }

    var catItemData = {};
    catItemData.sys_id = gr.getValue('cat_item');
    catItemData.cart_item_id = gr.getUniqueValue();
    catItemData.table = "sc_cart_item";
    catItemData.is_ordering = true;

    data.sc_cat_item = $sp.getCatalogItem(catItemData.sys_id);
    data.sc_cat_item.isCartItem = true;
    var values = getValues(cart_item_id);

    for (var f in data.sc_cat_item._fields) {
      // Put the values into the cat item fields
      var field = data.sc_cat_item._fields[f];
      if (typeof values[f] != "undefined" && typeof values[f].value != "undefined") {
        if (values[f].type == 9 || values[f].type == 10)
          field.value = values[f].displayValue;
        else if (values[f].type == 25)
          field.value = values[f].decrypted_value;
        else
          field.value = values[f].value;
        field.displayValue = values[f].displayValue;
        field.display_value_list = values[f].display_value_list;
      }
      updatePriceOnField(field);
    }

    data._generatedItemGUID = cart_item_id;
    data.quantity = '' + gr.quantity;

  } else {
    data.sys_id = $sp.getParameter('sys_id');
    data.sc_cat_item = $sp.getCatalogItem(data.sys_id, true);
    data._generatedItemGUID = gs.generateGUID();
  }

  data._attachmentTable = 'sc_cart_item';


  data.showPrices = $sp.showCatalogPrices();

  data.maxAttachmentSize = parseInt(gs.getProperty('com.glide.attachment.max_size', 1024));
  if (isNaN(data.maxAttachmentSize))
    data.maxAttachmentSize = 24;

  function getValues(sys_id) {
    var qs = new sn_sc.VariablePoolQuestionSetJS();
    qs.setCartID(sys_id);
    qs.load();
    var values = {};
    var questions = qs.getFlatQuestions();
    for (var i = 0; i < questions.length; i++) {
      var qKey = questions[i].name;
      if (typeof qKey == 'undefined' || qKey == '')
        qKey = "IO:" + questions[i].sys_id;
      values[qKey] = questions[i];
    }
    return values;
  }

  // Pricing utility functions
  function setPrice(field, p, rp) {
    if (p != undefined)
      field.price = p;
    if (rp != undefined)
      field.recurring_price = rp;
  }

  function updatePriceForReferenceTable(field) {
    var tableName = field.refTable + '';
    if (tableName != undefined && tableName != null && tableName != '') {
      var gr = new GlideRecord(tableName);
      if (gr.isValid()) {
        if (gr.get(field.value) && gr.isValidRecord()) {
          updatePrice(gr, field);
          updateRecurringPrice(gr, field);
        }
      }
    }
  }

  function updatePriceForListCollector(field) {
    var tableName = field.refTable + '';
    if (tableName != undefined && tableName != null && tableName != '') {
      var gr = new GlideRecord(tableName);
      if (gr.isValid()) {
        var values = field.value.split(',');
        gr.addQuery('sys_id', values);
        gr.query();
        var p = 0.0;
        var rp = 0.0;
        var price_value_list = [];
        while (gr.next()) {
          var price_field = {};
          updatePrice(gr, price_field);
          updateRecurringPrice(gr, price_field);
          if (price_field.price)
            p += Number(price_field.price);
          else
            price_field.price = 0.0;
          if (price_field.recurring_price)
            rp += Number(price_field.recurring_price);
          else
            price_field.recurring_price = 0.0;
          price_value_list.push(price_field);
        }
        field.price = p;
        field.recurring_price = rp;
        field.price_value_list = price_value_list;
      }
    }
  }

  function updatePrice(gr, field) {
    if (gr.isValidField('price'))
      field.price = gr.getValue('price');
    else if (gr.isValidField('u_price'))
      field.price = gr.getValue('u_price');
  }

  function updateRecurringPrice(gr, field) {
    if (gr.isValidField('recurring_price'))
      field.recurring_price = gr.getValue('recurring_price');
    else if (gr.isValidField('u_recurring_price'))
      field.recurring_price = gr.getValue('u_recurring_price');
  }

  function updatePriceOnField(field) {
    if (field.type == 'boolean' || field.type == 'boolean_confirm') {
      if (field.value == 'true' || field.value == true)
        setPrice(field, field._pricing.price_if_checked, field._pricing.recurring_price_if_checked);
      else
        setPrice(field, 0, 0);
    } else if (field.choices) {
      field.choices.forEach(function (choice) {
        if (choice.value + '' == field.value + '')
          setPrice(field, choice.price, choice.recurring_price);
      });
    } else if (field._pricing && field._pricing.pricing_implications === true) {
      if (field.type == 'reference')
        updatePriceForReferenceTable(field);
      else if (field.type == 'glide_list')
        updatePriceForListCollector(field);
    }
  }
})()