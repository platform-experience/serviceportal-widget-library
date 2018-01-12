(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});


  options.table = options.table || serverOptions.table;
  options.limit = options.limit_query || serverOptions.limit_query;
  options.encoded_query = options.encoded_query || serverOptions.encoded_query;

  options.featured_image = options.featured_image || serverOptions.featured_image;
  options.title_field = options.title_field || serverOptions.title_field;
  options.description_field = options.description_field || serverOptions.description_field;

  options.add_news_link = options.add_news_link || serverOptions.add_news_link;
  options.more_link = options.more_link || serverOptions.more_link;
  options.detail_link = options.detail_link || serverOptions.detail_link;

  options.order_type = options.order_type || serverOptions.order_type || "asc";
  options.order_by = options.order_by || serverOptions.order_by;


  if (!options.table || !options.encoded_query) {
    data.error = " Please provide Table and EncodedQuery"; // TODO Translate
    return
  }

  var newsGr = new GlideRecordSecure(options.table);
  newsGr.addEncodedQuery(options.encoded_query);
  newsGr.setLimit(options.limit || 5);

  var linkGr;
  if (options.add_news_link) {
    linkGr = new GlideRecord('sp_page');
    if (linkGr.get(options.add_news_link)) {
      data.add_news_link = linkGr.getValue('id');
    }
  }

  if (options.detail_link) {
    linkGr = new GlideRecord('sp_page');
    if (linkGr.get(options.detail_link)) {
      data.detail_link = linkGr.getValue('id');
    }
  }

  if (options.more_link) {
    linkGr = new GlideRecord('sp_page');
    if (linkGr.get(options.more_link)) {
      data.more_link = linkGr.getValue('id');
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
  var results = [];

  var tempObj;
  while (newsGr.next()) {
    tempObj = {};
    tempObj.sys_id = newsGr.sys_id.toString();
    tempObj.title = newsGr.getDisplayValue(options.title_field);
    tempObj.description = newsGr.getDisplayValue(options.description_field);
    tempObj.featured_image = newsGr.getDisplayValue(options.featured_image);

    tempObj.updated = newsGr.getDisplayValue('sys_updated_on');
    tempObj.updated_by = newsGr.getDisplayValue('sys_updated_by');

    results.push(tempObj)
  }
  data.items = results;

})();