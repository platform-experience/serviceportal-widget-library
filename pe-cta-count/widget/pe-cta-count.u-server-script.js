(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  data.count = 0;


  var conditions = $sp.getRelatedList('x_snc_custom_sp_in_m2m_condition_sp_instance', 'widget_instance');


  var gr;
  data.count = 0;
  conditions.forEach(function (item) {
      gr = new GlideRecordSecure(item.table);
      gr.addEncodedQuery(item.conditions);
      gr.query();
      var count = gr.getRowCount();
      data.count = data.count + count;
  });


})();