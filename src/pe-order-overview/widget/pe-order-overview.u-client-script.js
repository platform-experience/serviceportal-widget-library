function ($scope, $http, nowServer, $timeout, spUtil, spModal, i18n, $window, $location, spAriaUtil, nowAttachmentHandler, $log) {
	var c = this;
	$scope.guide_step = 0;
	$scope.m = $scope.data.msgs;
	$scope.evaluatingIncludes = false;

	$scope.showItem = function(index) {
		if($scope.itemShown == index)
			$scope.itemShown = -1;
		else
			$scope.itemShown = index;
	}
	
	$scope.goPrev = function() {
		$scope.guide_step--;
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
	
	$scope.goNext = function() {
		var gForm;
		if($scope.guide_step == 0) {
			gForm = includedGformInstances[$scope.data.sys_id];
			if(gForm.submit()) {
				evalIncludes();
				$scope.guide_step++;
				$scope.itemShown = 0;
			}
		}
		else if($scope.guide_step == 1) {
			var canSubmit = true;
			for (var i = 0; i < $scope.includedItems.length; i++) {
				if ($scope.includedItems[i].included) {
					gForm = includedGformInstances[$scope.includedItems[i].sys_id];
					if (gForm && !gForm.submit()) {
						canSubmit = false;
						$scope.includedItems[i].isOpen = true;
						$timeout(function(){
							var mandatory = $scope.includedItems[i]._mandatory;
							if (mandatory && mandatory.length > 0) {
								var elems = angular.element("[name*='" + mandatory[0].name + "']");
								if (elems && elems.length > 0) //set focus the first element
									elems[0].focus();
							}
						});
						break;
					}
				}
			}
			if(canSubmit) {
				evalGuidePrice();
				$scope.guide_step++;
			}
		}
	}
	
	evalIncludes();
	
	// Breadcrumbs
	
	if ($scope.data.featuredOnPage && $scope.data.sc_cat_item) {
		if (!$scope.data.categories)
			$scope.data.categories = [];
		if ($scope.data.categories.length > 0) {
		$scope.data.categories.unshift({label: $scope.data.sc_catalog || $scope.page.title, url: '?id=' + $scope.data.sc_catalog_page});
		$scope.data.categories.push({label: $scope.data.sc_cat_item.name, url: '#'});
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

	var includedGformInstances = {};
	$scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
		if (gFormInstance.getSysId() == '-1')
			return;
		includedGformInstances[gFormInstance.getSysId()] = gFormInstance;
	});
	
	$scope.$on('spModel.gForm.destroyed', function(e, sys_id){
		delete includedGformInstances[sys_id];
	});
	
	function getFieldsData(item) {
		var fieldData = {"variables":{}};
		for(var field in item._fields) {
			var fieldValue = "";
			if (typeof item._fields[field].value != "string")
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
	$scope.triggerAddToCart = function(orderGuide) {
		if(orderGuide){
			$location.url('?id=sc_cat_item_guide&sys_id='+$scope.data.sc_cat_item.sys_id);
		}else{


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
		
		if ($scope.data.sys_properties.twostep) {
				//Required to pass as payload for usage as embeddedWidget
				var embeddedWidgetOptions = {
					"auto_redirect" : "true",
					"requested_for_id" : "",
					"requested_for_display" : ""
				};

				var payload = {
					cart: '' + $scope.data.sys_id,
					items: getGuideItems('' + $scope.data.sys_id),
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
		} else {
			$scope.data.action = 'checkout_guide';
			$scope.data.guideItems = getGuideItems('' + $scope.data.sys_id);
			$scope.server.update().then(function(response) {
				$scope.data.action = undefined;
				$scope.data.guideItems = undefined;
				$scope.$emit("$sp.sc_order_guide.submitted", $scope.data.result);
				if ($scope.options.auto_redirect == 'false') {
					spUtil.addInfoMessage($scope.m.requestSubmitted);
					return;
				}
				else {
					$location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + $scope.data.result.request_id);
				}
			});
		}
	}

	function evalGuidePrice() {
		$scope.price = 0;
		var frequencyMap = {};
		for (var i = 0; i < $scope.includedItems.length; i++) {
			if ($scope.includedItems[i].included) {
				var pricing = $scope.includedItems[i]._pricing;
				var qty = parseInt($scope.includedItems[i].quantity);
				var effectivePrice = 0;
				var effectiveRecurringPrice = 0;
				
				if(typeof pricing.recurring_total != "undefined") {
					effectiveRecurringPrice = pricing.recurring_total;
				} else {
					effectiveRecurringPrice = pricing.recurring_price;
				}
				if (typeof pricing.price_total != "undefined") {
					effectivePrice = pricing.price_total;
				} else {
					effectivePrice = pricing.price;
				}
				
				if (effectiveRecurringPrice >= 0) {
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
			if (action === "renamed")
				spAriaUtil.sendLiveMessage($scope.m.renameSuccessMsg);
			if (action === "deleted")
				spAriaUtil.sendLiveMessage($scope.m.deleteSuccessMsg);
		};
		
		$scope.includedItems[itemIndex].confirmDeleteAttachment = function(attachment) {
			spModal.confirm($scope.data.msgs.delete_attachment).then(function() {
				$scope.includedItems[itemIndex].attachmentHandler.deleteAttachment(attachment);
				$('#add_attachment_button').focus();
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