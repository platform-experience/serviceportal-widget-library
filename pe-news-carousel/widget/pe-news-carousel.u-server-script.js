(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});


  options.table = options.table || serverOptions.table;
  options.featured_image = options.featured_image || serverOptions.featured_image;
  options.limit = options.limit || serverOptions.limit;
  options.encoded_query = options.encoded_query || serverOptions.encoded_query;
  options.title_field = options.title_field || serverOptions.title_field;
  options.description_field = options.description_field || serverOptions.description_field;
  options.link = options.link || serverOptions.link;
  options.order_type = options.order_type || serverOptions.order_type || "asc";
  options.order_by = options.order_by || serverOptions.order_by;
  options.autoplay = options.autoplay || serverOptions.autoplay;
  options.slideshow_timer = options.slideshow_timer || serverOptions.slideshow_timer || 5000;

  if (!options.table || !options.encoded_query) {
    data.error = " Please provide Table and EncodedQuery"; // TODO Translate
    return
  }

  var newsGr = new GlideRecordSecure(options.table);
  newsGr.addEncodedQuery(options.encoded_query);
  newsGr.setLimit(options.limit);

  if (options.link) {
    var linkGr = new GlideRecord('sp_page');
    if (linkGr.get(options.link)) {
      data.link = linkGr.getValue('id');
    }
  }

  if (options.order_by) {
    if (options.order_type == 'Descending') {
      newsGr.orderByDesc(options.order_by)
    } else {
      newsGr.orderBy(options.order_by)
    }
  }
  newsGr.query();

  var listOfFields = ['sys_id', options.featured_image, options.title_field, options.description_field];
  var results = [];

  var tempObj;
  while (newsGr.next()) {
    tempObj = {};
    // $sp.getRecordDisplayValues(tempObj, newsGr, listOfFields.join(','));
    tempObj.sys_id = newsGr.sys_id.toString();
    tempObj.title = newsGr.getDisplayValue(options.title_field);
    tempObj.description = newsGr.getDisplayValue(options.description_field);
    tempObj.featured_image = newsGr.getDisplayValue(options.featured_image);
    results.push(tempObj)
  }
  data.items = results;
})();