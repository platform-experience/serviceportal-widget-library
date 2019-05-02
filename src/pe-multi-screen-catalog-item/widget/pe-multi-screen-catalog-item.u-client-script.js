function ($scope, $location, nowAttachmentHandler, spScUtil, spUtil, spModal, McUtilUpload, McUtilContainers) {
  var c = this;
  var DEFAULT_RECORD_PRODUCER_REDIRECT_PAGE = 'ticket';


  c.isFirstScreen = McUtilContainers.isFirstScreen;
  c.isLastScreen = McUtilContainers.isLastScreen;
  c.next = McUtilContainers.next;
  c.previous = McUtilContainers.previous;
  c.getCurrentScreenTitle = McUtilContainers.getCurrentScreenTitle;
  c.getScreenCountAsArray = McUtilContainers.getScreenCountAsArray;
  c.getCurrentScreen = McUtilContainers.getCurrentScreen;
  c.goToScreen = McUtilContainers.goToScreen;
  c.getScreenOfField = McUtilContainers.getScreenOfField;

	$scope.isSelect2 = false;

  c.$onInit = function () {
    McUtilContainers.init(c.data.sc_cat_item._sections, c.data.sc_cat_item.sys_class_name);

    c.requestedFor = {
      displayValue: c.data.requestedFor.displayValue,
      value: c.data.requestedFor.value,
      name: 'requested_for'
    }

    c.quantity = c.data.quantity ? c.data.quantity + "" : "1";
  }

  c.cancel = function() {
    c.setCheckingOut(false);
  }

  c.getCurrentTitle = function(sys_class_name) {
    if(c.getCurrentScreen() == 0) {
      return c.data.sc_cat_item.name;
    } else if (c.isLastScreen() && !c.isRecordProducer()) {
      return c.options.checkoutTitle || 'Order Confirmation';
    } else {
      return c.getCurrentScreenTitle(sys_class_name, c.data.sc_cat_item.name);
    }
  }

  c.isRecordProducer = function(){
    return c.data.sc_cat_item.sys_class_name === 'sc_cat_item_producer';
  }

  c.confirmOrder = function() {
    c.confirmed = 'asking';
    spModal.open({
      title: 'Confirm Order?',
      message: 'Please confirm your order to proceed.'
    }).then(function(confirmed) {
      if (confirmed.label == 'OK') {
        c.triggerOnSubmit();
      }
    });
  }

  c.triggerOnSubmit = function(){
    if (validateMandatoryFields()) {
      $scope.data.sc_cat_item.quantity = c.quantity;
      $scope.data.sc_cat_item.item_action = "order";
      if (g_form)
        return g_form.submit();
      return false;
    }
  }

  c.triggerAddToCart = function () {
    if (validateMandatoryFields()) {
      $scope.data.sc_cat_item.item_action = "add_to_cart";
      $scope.data.sc_cat_item.quantity = c.quantity;
      if (g_form)
        return g_form.submit();
      return false;
    }
  }

  c.triggerUpdateCart = function() {
		$scope.data.sc_cat_item.item_action = "update_cart";
		$scope.data.sc_cat_item.quantity = c.quantity;
		if (g_form)
			return g_form.submit();
		return false;
	}

  c.hasImage = function() {
    return c.data.sc_cat_item.picture != '';
  }

  c.isCartItem = function() {
    return c.data.is_cart_item;
  }

  function validateMandatoryFields() {
    var fieldNames = g_form.getFieldNames();
    var mandatoryFieldsWithoutValue = fieldNames.filter(function(field) {
      return g_form.isMandatory(field) && !hasValue(field, g_form);
    });
    if (mandatoryFieldsWithoutValue.length > 0) {
      notifyUserOfMandFieldsWithoutValue(mandatoryFieldsWithoutValue);
      c.goToScreen(c.getScreenOfField(mandatoryFieldsWithoutValue[0]));
      return false;
    } else {
      return true;
    }
  }

  function notifyUserOfMandFieldsWithoutValue(fieldNames) {
    g_form.addErrorMessage('Some fields are incomplete');
    fieldNames.forEach(function(fieldName) {
      g_form.showFieldMsg(fieldName, "This field must be completed", 'error');
    });
  }

  /**
   * Check whether a particular field on a form has a value
   * Copied from /scripts/sn/common/clientScript/glideFormFieldFactory.js
   * @param  {String}  fieldName     The name of the field to check
   * @param  {Object}  gFormInstance The GlideForm of the form with the field
   * @return {Boolean}               Whether the field has a value
   */
  function hasValue(fieldName, gFormInstance) {

    var field = gFormInstance.getField(fieldName);
    var value = gFormInstance.getValue(fieldName);

    switch (field.type) {
      case 'boolean_confirm':
        return value === 'true';
      case 'boolean':
        return true;
      case 'currency':
        var currencyValues = value.split(';');
        return currencyValues[1] && currencyValues[1].length;
    }

    if (value === null) {
      return false;
    }

    if (typeof value === 'undefined') {
      return false;
    }

    var trimmed = String(value).trim();
    return trimmed.length > 0;
  }

  /* Setup attachment handler */
  $scope.attachmentHandler = new nowAttachmentHandler(function appendDone () {
    $scope.$broadcast("sp.attachments.update", c.data.form._attachmentGUID);
  }, function appendError () {
    /* $scope.errorMessages.push(error); */
    /* spUtil.addErrorMessage(error.msg + error.fileName); */
  });
  $scope.$evalAsync(function() {
    $scope.attachmentHandler.setParams($scope.data._attachmentTable, $scope.data._generatedItemGUID, 1024 * 1024 * $scope.data.maxAttachmentSize);
  });

  // Initialize the McUtilUpload service
  McUtilUpload.init($scope.data._attachmentTable, $scope.data._generatedItemGUID);


  c.getItemId = function () {
		return $scope.data.sc_cat_item ? $scope.data.sc_cat_item.sys_id : -1;
  };

  function getOne() {
    $scope.server.get({
			action: 'log_request',
			itemDetails: {sys_id: $scope.data.sc_cat_item.sys_id,
										name: $scope.data.sc_cat_item.name,
										sys_class_name: $scope.data.sc_cat_item.sys_class_name}
    });
    if ($scope.data.sc_cat_item.sys_class_name == "sc_cat_item_producer") {
      postCatalogFormRequest().then(function (response) {
        var a = response.data.result;
        handleRedirect(a.table, a.sys_id);
      });
    } else {
      if (c.data.sys_properties.twostep) {
        // Set additional parameters and add them to orderNow function
        var additionalParms = {
          sysparm_requested_for: c.requestedFor.value,
          special_instructions: c.special_instructions,
          delivery_address: c.deliverTo
        };
        spScUtil.orderNow($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms).then(function (response) {
          var a = response.data.result;
          $location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + a.sys_id);
        });
      } else {
        spScUtil.orderNow($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID).then(function (response) {
          var a = response.data.result;
          $location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + a.sys_id);
        });
      }
    }
  }

  function handleRedirect(table, sys_id) {
    var page = '';
    if (c.isRecordProducer())
      page = c.options.record_producer_redirect_page || DEFAULT_RECORD_PRODUCER_REDIRECT_PAGE;
    $location.search(formatRedirectUrl(page, table, sys_id));
  }

  function formatRedirectUrl(page, table, sys_id) {
		var url;
		var paramObj = {page: page, table: table, sys_id: sys_id};
		url = spUtil.format(c.options.url, paramObj);
		return url;
	}

  function getVarData(fields) {
		var reqData = {};
		for(var obj in fields)
			reqData[fields[obj].name] = fields[obj].value;
		return reqData;
	}

  function postCatalogFormRequest() {
		if ($scope.data.sc_cat_item.sys_class_name === "sc_cat_item_producer")
			return spScUtil.submitProducer($scope.data.sc_cat_item.sys_id, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID/*, $scope.data.workspaceParams*/);
    else if ($scope.data.sc_cat_item.item_action === "add_to_cart")
      return spScUtil.addToCart($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID);
    else if ($scope.data.is_cart_item)
			return spScUtil.updateCart($scope.data._generatedItemGUID, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields));
  }

  function addToCart() {
    $scope.server.get({
			action: 'log_request',
			itemDetails: {sys_id: $scope.data.sc_cat_item.sys_id,
										name: $scope.data.sc_cat_item.name,
										sys_class_name: $scope.data.sc_cat_item.sys_class_name}
    });
    postCatalogFormRequest().then(function(response) {
      $rootScope.$broadcast("$sp.service_catalog.cart.add_item");
      $rootScope.$broadcast("$sp.service_catalog.cart.update");
      $scope.$emit("$sp.sc_cat_item.add_to_cart", $scope.data._generatedItemGUID);
      spUtil.addInfoMessage('Your item has been added to your Cart.');
      // Refresh the server data so that we won't get a duplicate order
      $scope.server.refresh();
    });
  }

  function updateCart() {
		postCatalogFormRequest().then(function(response) {
			$location.search('id=sc_cart');
		})
	}

	var g_form;
	$scope.$on('spModel.gForm.initialized', function(e, gFormInstance){
    if (gFormInstance.getSysId() != -1 && gFormInstance.getSysId() != c.getItemId())
			return;
    g_form = gFormInstance;
    // This runs after all onSubmit scripts have executed
		g_form.$private.events.on('submitted', function(){
			if ($scope.data.sc_cat_item.item_action === "order")
        getOne();
      else if ($scope.data.sc_cat_item.item_action === "add_to_cart")
        addToCart();
      else if ($scope.data.sc_cat_item.item_action == "update_cart")
				updateCart();
		});
	});
}