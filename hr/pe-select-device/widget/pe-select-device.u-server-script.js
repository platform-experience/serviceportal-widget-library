(function() {
  data.categories = [];
  var listOfCategoriesID = [];
  var categoryObj = {};

  var sys_id;

  data.taskState = options.state;

  var grScCategory = new GlideRecord('sc_category');
  grScCategory.addQuery('sc_catalog', 'd89971a0db841b0008f0ff041d9619c2'); // TODO get the catalog from SP record ?
  grScCategory.addQuery('active', true);
  grScCategory.query();

  while (grScCategory.next()) {
    sys_id = grScCategory.sys_id.toString();
    data.categories.push({
      sys_id: sys_id,
      title: grScCategory.title.toString()
    });
    listOfCategoriesID.push(sys_id);
    categoryObj[sys_id] = [];
  }

  var grCatalogItem = new GlideRecord('sc_cat_item');
  grCatalogItem.addQuery('category', 'IN', listOfCategoriesID);
  grCatalogItem.addQuery('active', true);
  grCatalogItem.query();

  while (grCatalogItem.next()) {
    sys_id = grCatalogItem.category.toString();
    if (Object.keys(categoryObj).indexOf(sys_id) !== -1) {
      categoryObj[sys_id].push({
        name: grCatalogItem.name.toString(),
        sys_id: grCatalogItem.sys_id.toString(),
        picture: grCatalogItem.getDisplayValue('picture'),
        short_description: grCatalogItem.getDisplayValue('short_description'),
        description: grCatalogItem.getDisplayValue('description'),
        price: grCatalogItem.getDisplayValue('price')
      });
    }
  }

  data.categoryObj = categoryObj;
})();
