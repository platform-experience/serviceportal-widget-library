(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'How can we help?';
  options.category = options.category || serverOptions.category || 'PE How Can We Help';
  options.items = options.items || serverOptions.items || 'sc_cat_item.name, sc_cat_item.icon';
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