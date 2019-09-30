function ogAltCtrl($scope, $http, nowServer, $timeout, spUtil, spModal, i18n, $window, $location, spAriaUtil, nowAttachmentHandler, $log, $sce, $q, spAtf, spSCNavStateManager) {
	var c = this;
  $scope.guide_step = 0;
  $scope.item_step = 0;
	$scope.m = $scope.data.msgs;
	$scope.evaluatingIncludes = false;
	
	$rootScope.$on('spModel.gForm.rendered', function() {
		$timeout(function() {
      spAtf.init().then(function(atf) {
        $scope._atf = atf;
        atf.expose('catalog_util', catalogUtil);
      });
		}, 10);
	});
	
	var catalogUtil = {
		updateGform: function() {
			var g_form = getCurrentGForm();
			if (g_form)
				$scope._atf.expose('g_form', spAtf.augmentForm(g_form));
		},
		
		addRow: function(fieldId, timeoutInMS) {
			var deferred = $q.defer();
			var g_form = getCurrentGForm();
			if (g_form) {
				if (timeoutInMS <= 0)
					timeoutInMS = 1000;
				$scope.$broadcast("$sp.sc_multi_row.create_row", fieldId, g_form.getSysId());
				$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
					if (gFormInstance.getSysId() == fieldId)
						deferred.resolve();
				});
				$timeout(function() {
					deferred.reject();
				}, timeoutInMS);
			}
			else
				deferred.reject();
			return deferred.promise;
		},
		
		navigateToStep: function(num, timeout) {
			var defer = $q.defer();
			var step = parseInt(num) - 1;
			if (Math.abs(step - $scope.guide_step) != 1) {
				defer.reject("Can't navigate to next step");
				return defer.promise;
			}
			if (step > $scope.guide_step)
				$scope.goNext(timeout);
			else {
				$scope.goPrev();
				defer.resolve();
			}
			var cleanup = $scope.$on('$sp.service_catalog.form_submit_failed', function() {
					cleanup();
					defer.reject("Can't navigate to next step");
			});
			var cleanup1 = $scope.$on('$sp.service_catalog.form_submitted', function() {
				cleanup1();
				defer.resolve("Can navigate to next step");
			});
			return defer.promise;
		},
		
		validateIncludedList: function(list, stage) {
			var items = list.split(',').reduce(function(obj, item) {
				obj[item] = false;
				return obj;
			}, {});
			var included = stage == 1 ? $scope.includedItems : $scope.includedItems.filter(function(item) {
				return item.included == true;
			});
			if (Object.keys(items).length != included.length)
				return false;
			for (var i = 0; i < included.length; i++)
				if (!items.hasOwnProperty(included[i].sys_id))
					return false;
			return true;
		},
		
		openItem: function(item, state, timeoutInMS) {
			if (timeoutInMS <= 0)
				timeoutInMS = 10000;
			var defer = $q.defer();
			if (includedGformInstances[item]) {
				openItemHelper(item, state, defer);
			}
			$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
				if (gFormInstance.getSysId() == item) {
					openItemHelper(item, state, defer);
				}
			});
			$timeout(function() {
				defer.reject();
			}, timeoutInMS);
			return defer.promise;
		},
		
		getPrice: function() {
			var res = {};
			var item = $scope.includedItems.find(function(itemData) {
				return itemData.isOpen == true;
			});
			if (item) {
				res.price = item.price;
				res.recurring_price = item.recurring_price;
				res.recurring_frequency = item.recurring_frequency;
			}
			return res;
		},
		
		getGuidePrice: function() {
			return $scope.price_display;
		},
	
		addToCart: function() {
			var defer = $q.defer();
			$scope.triggerAddToCart();
			if (!$scope.submitted)
				defer.reject("Can't submit form.");
			else
				defer.resolve();
			return defer.promise;
		},
		
		submitOrderGuide: function() {
			var defer = $q.defer();
			if ($scope.triggerSubmit()) {
				if ($scope.data.sys_properties.twostep && $scope.data.sc_cat_item.request_method != "submit") {
					defer.resolve();
				}
				else{
					var cleanUp = $scope.$on('$sp.sc_order_guide.submitted', function(o, result) {
						$timeout(function() {
							cleanUp();
							result.single_step = true;
							defer.resolve(result);
						}, 10);
					});
				}
			}
			else
				defer.reject();
			return defer.promise;
		}
	};
	
	function getCurrentGForm() {
		if ($scope.guide_step == 0)
			return includedGformInstances[$scope.data.sc_cat_item.sys_id];
    else {
			var openItem = $scope.includedItems.find(function(item){
				return item.isOpen === true;
			});
			return includedGformInstances[openItem.sys_id];
		}
	}

	$scope.showItem = function(index) {
		if($scope.itemShown == index)
			$scope.itemShown = -1;
		else
			$scope.itemShown = index;
  }
  
  $scope.goNext = function(timeout) {
    if ($scope.guide_step === 0)
      $scope.goToStepItem(1,0,timeout);
    else if (!$scope.includedItems || $scope.item_step === ($scope.includedItems.length - 1) )
      $scope.goToStepItem(2,null,timeout);
    else
      $scope.goToStepItem( 1, $scope.item_step + 1,timeout);
  }

  $scope.goPrev = function(timeout) {
    if ($scope.guide_step === 2)
      $scope.goToStepItem(1, ($scope.includedItems ? $scope.includedItems.length-1 : null),timeout );
    else if ($scope.item_step === 0)
      $scope.goToStepItem(0,null,timeout);
    else
      $scope.goToStepItem( 1, $scope.item_step - 1,timeout );
  }

  $scope.goToStepItem = function(step, item, timeout) {
    
    console.log(step, item, $scope);
    switch (step) {

      case 0:
        if ($scope.guide_step === 0) return;
        else {
          $scope.includedItems.forEach(function (item) {
            item.isOpen = false;
          });
          $scope.guide_step = 0;
          //spSCNavStateManager.unregisterForms(Object.keys(includedGformInstances));
        }
        break;

      case 1:
        $scope.item_step = item;
        if ($scope.guide_step === 0) {
          var gForm;
          $scope.$evalAsync(function () {
            gForm = includedGformInstances[$scope.data.sys_id];
            if(gForm && !gForm.submit()) {
              timeout = timeout || 2000;
              $timeout(function () {
                $scope.$broadcast('$sp.service_catalog.form_submit_failed', {action_name: 'submit'});
              }, timeout);
            }
          });
        } else $scope.guide_step = 1;
        break;

      case 2:
        if ($scope.guide_step === 2) return;
        $scope.$evalAsync(function () {
          for (var i = 0; i < $scope.includedItems.length; i++) {
            if ($scope.includedItems[i].included) {
              var g_form = includedGformInstances[$scope.includedItems[i].sys_id];
              g_form.$private.processed = false;
              if (g_form && !g_form.submit()) {
								$scope.includedItems[i].field_values = [];
								$scope.includedItems[i]._sections.forEach( function(section) {
									section.columns.forEach(function(column){
										column.fields.forEach(function(field){
											if (field.type == "field") {
												$scope.includedItems[i].field_values.push({
													label: $scope.includedItems[i]._fields[field.name].label,
													display_value: $scope.includedItems[i]._fields[field.name].displayValue,
													visible: $scope.includedItems[i]._fields[field.name].visible
												});
											}
										});
									});
								});
								
                timeout = timeout || 1000;
                $scope.includedItems[i].isOpen = true;
                $timeout(function () {
                  $scope.$broadcast('$sp.service_catalog.form_submit_failed', {action_name: 'submit'});
                  for (var i =0; i < $scope.includedItems.length; i++) {
                    var mandatory = $scope.includedItems[i]._mandatory;
                    if (mandatory && mandatory.length > 0) {
                      var elems = angular.element("[name*='" + mandatory[0].name + "']");
                      if (elems && elems.length > 0) { 
                        $scope.item_step = i; //go to item with first unfilled mandatory
                        elems[0].focus(); //set focus the first element
                        return;
                      }
                    }
                  }
                }, timeout);
              }
            }
          }
        });
        break;

      default:
        return;
    }
  }
	
	$scope.toggleItemState = function(item) {
		if(item.included) {
			$scope.totalIncluded--;
			angular.element('#item_details_' + item.sys_id).find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').attr('tabindex', -1);
		}
		else {
			$scope.totalIncluded++;
			angular.element('#item_details_' + item.sys_id).find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').removeAttr('tabindex');
		}
	}
	
	function processChooseOptions() {
		var canSubmit = true;
		
		for (var i = 0; i < $scope.includedItems.length; i++) {
      if ($scope.includedItems[i].included) {
        var gForm = includedGformInstances[$scope.includedItems[i].sys_id];
        if (gForm && !gForm.$private.processed) {
          canSubmit = false;
          break;
        }
      }
		}
		if(canSubmit) {
			evalGuidePrice();
			spSCNavStateManager.unregisterForms(Object.keys(includedGformInstances));
			$scope.$broadcast('$sp.service_catalog.form_submitted', {action_name: 'submit'});
      $scope.guide_step = 2;
		}
	}
  
	// Breadcrumbs
	if ($scope.data.sc_cat_item) {
		$scope.data.sc_cat_item.description = $sce.trustAsHtml($scope.data.sc_cat_item.description);
		if (!$scope.data.categories)
			$scope.data.categories = [];
		$scope.data.categories.forEach(function(category, index, categories){
			categories[index].url = category.url + '&catalog_id=' + $scope.data.catalog_id;
		});
		if ($scope.data.categories.length > 0) {
			$scope.data.categories.unshift({label: $scope.data.sc_catalog || $scope.page.title, url: '?id=' + $scope.data.sc_category_page});
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
			if ($scope.data.all_catalog_msg) {
				$scope.data.categories.unshift({label: $scope.data.all_catalog_msg, url: '?id=' + $scope.data.sc_category_page + "&catalog_id=-1"});
			}
		}
		else {
			$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
		}
		
		$timeout(function() {
			$scope.$emit('sp.update.breadcrumbs', $scope.data.categories);
		});
		spUtil.setSearchPage('sc');
	} else {
		var notFoundBC = [{label: $scope.page.title, url: '?id=' + $scope.data.sc_catalog_page}];
		$timeout(function() {
			$scope.$emit('sp.update.breadcrumbs', notFoundBC);
		});
		spUtil.setSearchPage('sc');
	}
	
	if ($scope.data.sc_cat_item.request_method == "request")
		$scope.submitButtonMsg = $scope.m.requestMsg;
	else if ($scope.data.sc_cat_item.request_method == "submit")
		$scope.submitButtonMsg = $scope.m.submitMsg;
	else
		$scope.submitButtonMsg = $scope.m.orderNowMsg;

	function isValidItemGform(g_form) {
		if (g_form.getSysId() === $scope.data.sc_cat_item.sys_id)
			return true;
		if ($scope.includedItems)
			for (i in $scope.includedItems)
				if ($scope.includedItems[i].sys_id === g_form.getSysId())
					return true;
		return false;
	}

	var includedGformInstances = {};
	$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
		if (!isValidItemGform(gFormInstance))
			return;
		includedGformInstances[gFormInstance.getSysId()] = gFormInstance;
    spSCNavStateManager.register(gFormInstance);
    if (gFormInstance.getSysId() == $scope.data.sc_cat_item.sys_id)
      evalIncludes(); // JS - to load included items
		gFormInstance.$private.events.on('submitted', function(event) {
      gFormInstance.$private.processed = true;
      if (gFormInstance.getSysId() == $scope.data.sc_cat_item.sys_id) {
        $scope.$broadcast('$sp.service_catalog.form_submitted', {action_name: 'submit'});
        evalIncludes();
        spSCNavStateManager.unregisterForms(Object.keys(includedGformInstances));
        $scope.guide_step = 1;
        $scope.itemShown = 0;
      }
      else
        processChooseOptions();
		});
		
		$timeout(function() {
			$rootScope.$emit('spModel.gForm.rendered');
		}, 175);
	});
	
	$scope.$on('spModel.gForm.destroyed', function(e, sys_id){
		delete includedGformInstances[sys_id];
	});
	
	function openItemHelper(item, state, defer) {
		for (var i = 0; i < $scope.includedItems.length; i++)
			if ($scope.includedItems[i].sys_id == item) {
				$scope.includedItems[i].included = state == 'true';
				$scope.includedItems[i].isOpen = true;
				$scope._atf.expose('g_form', spAtf.augmentForm(includedGformInstances[item]));
				defer.resolve();
			}
	}
	
	function getFieldsData(item) {
		var fieldData = {"variables":{}};
		for(var field in item._fields) {
			var fieldValue = "";
			if (item._fields[field].value != null && typeof item._fields[field].value != "string")
				fieldValue = JSON.stringify(item._fields[field].value);
			else
				fieldValue = item._fields[field].value;
			fieldData.variables[item._fields[field].name] = fieldValue;
				
		}
		return fieldData;
	}
	
	function getGuideItems(cartname) {
		var items = [];
		var item;
		for(var i = 0; i < $scope.includedItems.length; i++) {
			if($scope.includedItems[i].included) {
				item = getFieldsData($scope.includedItems[i]);
				item.sysparm_id = item.sysparm_active = $scope.includedItems[i].sys_id;
				item.sysparm_quantity = $scope.includedItems[i].quantity;
				item.sysparm_cart_name = cartname;
				item.sysparm_item_guid = $scope.includedItems[i].sysparm_item_guid;
				items.push(item);
			}
		}
		return items;
	}
	$scope.triggerAddToCart = function() {
		if($scope.submitted)
			return;
		$scope.server.get({
			action: 'log_request',
			itemDetails: {sys_id: $scope.data.sc_cat_item.sys_id, 
										name: $scope.data.sc_cat_item.name,
										sys_class_name: $scope.data.sc_cat_item.sys_class_name}
		});
		$scope.submitted = true;
		$scope.server.get({
			action: "add_to_cart",
			items: getGuideItems(""),
			sys_id: $scope.data.sys_id
		}).then(function(response) {
			$rootScope.$broadcast("$sp.service_catalog.cart.add_item");
			$rootScope.$broadcast("$sp.service_catalog.cart.update");
			$scope.$emit("$sp.sc_order_guide.add_to_cart");
			
			spModal.open({
					message: i18n.getMessage('Items have been added successfully'),
					size: 'sm',
				  backdrop: 'static',
					keyboard: false,
				  noDismiss: true,
					buttons: [
							{label: i18n.getMessage('Catalog Home'), cancel:true},
							{label: i18n.getMessage('View Cart'), primary:true}
						]
			}).then(function() {
					$location.search("id=sc_cart");
				}, function() {
					$location.search("id=sc_home");
				})
			
		});
	}
	// order / create request
	$scope.triggerSubmit = function() {
		if ($scope.submitted)
			return;
		if ($scope.options.isServiceWorkspace && $window.frameElement) {
			var workspaceParams = {};
			workspaceParams.sysparm_parent_table = $window.frameElement.getAttribute('parent-table');
			workspaceParams.sysparm_parent_sys_id = $window.frameElement.getAttribute('parent-sys-id');
			$scope.data.workspaceParams = workspaceParams;
		}
		$scope.server.get({
			action: 'log_request',
			itemDetails: {sys_id: $scope.data.sc_cat_item.sys_id, 
										name: $scope.data.sc_cat_item.name,
										sys_class_name: $scope.data.sc_cat_item.sys_class_name}
		});
		$scope.submitted = true;
		var hasItems = $scope.includedItems.filter(function(item) {
			return item.sys_class_name != 'sc_cat_item_producer';
		}).length > 0;
		
		if ($scope.data.sys_properties.twostep && $scope.data.sc_cat_item.request_method != "submit") {
				//Required to pass as payload for usage as embeddedWidget
				var embeddedWidgetOptions = {
					"auto_redirect" : "true",
					"requested_for_id" : "",
					"requested_for_display" : ""
				};
				var payload = {
					cart: '' + $scope.data.sys_id,
					itemDetails: {
						items: getGuideItems('' + $scope.data.sys_id),
						request_method: $scope.data.sc_cat_item.request_method
					},
					workspaceParams: $scope.data.workspaceParams,
					action: "order_guide"
				};
				for (var embeddedOption in embeddedWidgetOptions) {
					payload[embeddedOption] = c.options[embeddedOption] || embeddedWidgetOptions[embeddedOption];
				}
				$scope.server.get(payload).then(function(response) {
					var orderGuideModalCtrl;
					var unregister = $scope.$on('$sp.service_catalog.cart.cancel_order', function(){
						orderGuideModalCtrl.close();
						$scope.submitted = false;
					});
					var closeModalOnSubmit = $scope.$on("$sp.service_catalog.cart.submitted", function () {
						orderGuideModalCtrl.close();
						$scope.submitted = true;
					});
					var orderGuideModal = angular.copy(response.data.orderGuideModal);
					orderGuideModal.options.afterOpen = function(ctrl){
						orderGuideModalCtrl = ctrl;
					};
					orderGuideModal.options.afterClose = function() {
						unregister();
						closeModalOnSubmit();
						$scope.orderGuideModal = null;
						orderGuideModalCtrl = null;
					};
					$scope.orderGuideModal = orderGuideModal;
				});
			return $scope.submitted;
		} else {
			$scope.data.action = 'checkout_guide';
			$scope.data.guideItems = getGuideItems('' + $scope.data.sys_id);
			$scope.server.update().then(function(response) {
				$scope.data.action = undefined;
				$scope.data.guideItems = undefined;
				$scope.$emit("$sp.sc_order_guide.submitted", $scope.data.result);
				$scope.submitted = true;
				if ($scope.options.auto_redirect == 'false') {
					spUtil.addInfoMessage($scope.m.requestSubmitted);
					return;
				}
				else {
					if ($scope.data.result.request_id) 
						$location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + $scope.data.result.request_id);
					else 
						$location.search('?');
					
				}
			});
		return $scope.submitted;
		}
	}
	function evalGuidePrice() {
		$scope.price = 0;
		var frequencyMap = {};
		for (var i = 0; i < $scope.includedItems.length; i++) {
			if ($scope.includedItems[i].included && $scope.includedItems[i].process_price) { 
				var qty = parseInt($scope.includedItems[i].quantity);
				var pricing = $scope.includedItems[i]._pricing;
				var effectivePrice = 0;
				var effectiveRecurringPrice = 0;
				if (typeof $scope.includedItems[i].price != "undefined") {
					effectivePrice = $scope.includedItems[i].price;
				}
				if (typeof $scope.includedItems[i].recurring_price != "undefined") {
					effectiveRecurringPrice = $scope.includedItems[i].recurring_price;
				}

				if (effectiveRecurringPrice >= 0 && pricing.rfd) {
					if(frequencyMap[pricing.rfd])
						frequencyMap[pricing.rfd] += effectiveRecurringPrice * qty;
					else
						frequencyMap[pricing.rfd] = effectiveRecurringPrice * qty;
				}
				if (effectivePrice >= 0)
					$scope.price += effectivePrice * qty;
			}
		}
		frequencyMap.price = $scope.price;
		$scope.server.get({
			action: "format_prices",
			prices: frequencyMap
		}).then(function(response) {
			$scope.frequencySequence = response.data.frequencySequence;
			$scope.price_display = response.data.frequencyMap.price;
			$scope.frequencyMap = response.data.frequencyMap;
		});
	}
	
	function evalIncludes() {
		// don't allow submit while waiting on included items eval
		$scope.evaluatingIncludes = true;
		$scope.includedItems = [];
		var guideData = getFieldsData($scope.data.sc_cat_item);
		guideData.sysparm_id = $scope.data.sys_id;
		guideData.without_cart = true;
		guideData._fields = $scope.data.sc_cat_item._fields;
		guideData.cascade = $scope.data.sc_cat_item.cascade;
		$scope.server.get({
			action: "init_guide",
			orderGuideData: guideData
		}).then(function(response) {
			$scope.includedItems = response.data.items;
			$scope.showIncludeToggle = response.data.showIncludeToggle;
			initAttachmentHandlers();
			$scope.includedItems.forEach(function(item) {
				item.description = $sce.trustAsHtml(item.description);
            });
			$scope.totalIncluded = $scope.includedItems.length;
			$scope.evaluatingIncludes = false;
		});
	}
	
	$scope.$on('dialog.upload_too_large.show', function(e){
		$log.error($scope.m.largeAttachmentMsg);
		spUtil.addErrorMessage($scope.m.largeAttachmentMsg);
	});
	
	$scope.initAttachmentCallbacks = function (itemIndex) {
		$scope.includedItems[itemIndex].attachmentHandler.setAttachments = function (attachments, action) {
			$scope.includedItems[itemIndex].attachments = attachments;
			if (action === "added") {
				$scope.includedItems[itemIndex].attachment_submitted = true;
			}
			if (action === "renamed")
				spAriaUtil.sendLiveMessage($scope.m.renameSuccessMsg);
			if (action === "deleted") {
				spAriaUtil.sendLiveMessage($scope.m.deleteSuccessMsg);
				if ($scope.includedItems[itemIndex].attachments.length == 0)
				$scope.includedItems[itemIndex].attachment_submitted = false;
			}
			spUtil.get($scope,{action: "from_attachment"});
		};
		
		$scope.includedItems[itemIndex].confirmDeleteAttachment = function(attachment) {
			spModal.confirm($scope.data.msgs.delete_attachment).then(function() {
				$scope.includedItems[itemIndex].attachmentHandler.deleteAttachment(attachment);
				$scope.setFocusToAttachmentButton();
			});
		}
	}
	
	function initAttachmentHandlers() {
			var setAttachments;
			var appendError = function (error) {
					spUtil.addErrorMessage(error.msg + error.fileName);
			};
			for (var i = 0; i < $scope.includedItems.length; i++) {
				$scope.includedItems[i].attachmentHandler = new nowAttachmentHandler(setAttachments, appendError);
				$scope.includedItems[i].attachmentHandler.setParams($scope.includedItems[i].targetTable, $scope.includedItems[i].sysparm_item_guid, 1024 * 1024 * $scope.data.maxAttachmentSize);
			}
	}
}