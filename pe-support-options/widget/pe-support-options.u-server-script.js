(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title;
  options.category = options.category || serverOptions.category;
  options.items = options.items || serverOptions.items;
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