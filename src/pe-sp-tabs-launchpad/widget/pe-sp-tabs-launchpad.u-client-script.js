function spLaunchpadController(spUtil, $scope, $location, $timeout, $rootScope) {
  $scope.load = false;
  var c = this;
  c.currentMenuItem = '';
  var record_watchers = [];
  $timeout(function () {
    $scope.load = true;
  }, 200);

  if (c.data.menu_items) {
    c.currentMenuItem = c.data.menu_items[0].sys_id;
    for (var i in c.data.menu_items) {
      var item = c.data.menu_items[i];
      if (item.scriptedItems)
        record_watchers = record_watchers.concat(item.scriptedItems.record_watchers);
    }
  }

  c.update = function (data) {
    $scope.load = false;
    c.server.get({}).then(function (response) {
      c.data = response.data;
      $scope.load = true;
    });
  };

  for (var y in record_watchers) {
    var watcher = record_watchers[y];
    spUtil.recordWatch($scope, watcher.table, watcher.filter, c.update);
  }

  c.goTo = function (item) {
    $location.search({
      id: 'list', //option
      table: item.scriptedItems.data.table,
      filter: item.scriptedItems.data.filter,
      view: 'sp'
    });
  };

  c.select = function (record, item) {
    $location.search({
      id: item.scriptedItems.page_id || 'ticket', //option
      table: item.scriptedItems.page_table || record.table,
      sys_id: (item.scriptedItems.page_sys_id) ? record.v[item.scriptedItems.page_sys_id] : record.sys_id
    });
  };

  c.filterFields = function (arg) {
    if (arg.name && arg.name.indexOf('sys_id') == -1)
      return true;
    return false;
  };


  $rootScope.$on('x-pisn-sp-launchp-update-count', function (event, data) {
    if (data.menu_sys_id)
      for (var i in c.data.menu_items) {
        if (c.data.menu_items[i].sys_id == data.menu_sys_id)
          c.data.menu_items[i].scriptedItems.count = data.count;
      }
  });

}
