(function () {
  data.uri = gs.getProperty('glide.servlet.uri');

  options.overlay = options.overlay == 'true' || options.overlay == true;
  options.order_by = options.order_by || options.display_field;

  var gr = new GlideRecord('sp_instance_table');
  gr.setLimit(1);
  gr.addQuery('sp_widget', options.sp_widget);
  gr.addQuery('sp_column', options.sp_column);
  gr.query();
  while (gr.next())
    data.widget_sys_id = gr.getUniqueValue();

})();
