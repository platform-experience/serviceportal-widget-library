(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title;
  options.category = options.category || serverOptions.category;
  options.fields = options.fields || serverOptions.fields;
  options.items = options.items || serverOptions.items;
  options.display_all_items = options.display_all_items || serverOptions.display_all_items;
  var categoriesGR = GlideRecord('sc_cat_item_category');
  var allItems = 'sc_category.title=' + options.category;
  var selectedItems = 'sc_category.title=' + options.category + '^sc_cat_item.nameIN' + options.items;
  var encodedQuery = options.display_all_items == 'true' ? allItems : selectedItems;
  categoriesGR.addEncodedQuery(encodedQuery);
  categoriesGR.query();
  var items = [];
  var obj;
  while (categoriesGR.next()) {
    obj = {};
    $sp.getRecordElements(obj, categoriesGR, options.fields);
    items.push(obj);
  }
  data.items = items;
})();