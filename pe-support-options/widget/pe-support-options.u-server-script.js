(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'Support Options';
  options.category = options.category || serverOptions.category || 'PE Support Options';
  options.items = options.items || serverOptions.items || 'sc_cat_item.name, sc_cat_item.icon, sc_cat_item.short_description';
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