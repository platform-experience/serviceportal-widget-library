(function () {
  var slAPI = new SpLaunchpadAPI();
  var menu_id = $sp.getValue('sys_id');
  var gr = new GlideRecord('sp_instance_menu');
  gr.get(menu_id);
  data.menu_items = $sp.getMenuItems(menu_id);
  for (var i in data.menu_items)
    if (data.menu_items[i].scriptedItems.type != 'widget') {
      data.menu_items[i].scriptedItems.data = slAPI.getData(
        data.menu_items[i].scriptedItems.table,
        data.menu_items[i].scriptedItems.filter,
        data.menu_items[i].scriptedItems.limit,
        data.menu_items[i].scriptedItems.attributes
      );
      if (data.menu_items[i].scriptedItems.filter_count)
        data.menu_items[i].scriptedItems.count = slAPI.getCount(
          data.menu_items[i].scriptedItems.table,
          data.menu_items[i].scriptedItems.filter_count
        );
    }
  else
    data.menu_items[i].scriptedItems.widget = $sp.getWidget(
      data.menu_items[i].scriptedItems.widget_id, data.menu_items[i].scriptedItems.widget_options);
})();
