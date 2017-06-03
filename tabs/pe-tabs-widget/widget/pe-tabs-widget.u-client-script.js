function DynamicTabsController(tabService) {
  var c = this;

  c.$onInit = function() {
    c.selectedTab = 'expired';
    c.tabs = tabService.getTabs();
  };
}