(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'Recommended for You';
  options.category = options.category || serverOptions.category || 'PE My Devices';
  options.items = options.items || serverOptions.items || 'sc_cat_item.name, sc_cat_item.icon, sc_cat_item.short_description';
  options.highlight = options.highlight || serverOptions.highlight || 'Office 2016';
  var categoriesGR = GlideRecord('sc_cat_item_category');
  var encodedQuery = 'sc_category.title=' + options.category;
  categoriesGR.addEncodedQuery(encodedQuery);
  categoriesGR.query();
  var items = [];
  var obj;
  while (categoriesGR.next()) {
    obj = {};
    $sp.getRecordElements(obj, categoriesGR, options.items);
    items.push(obj);
  }
  data.items = items;
})();