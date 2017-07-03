(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.obj = {};
  data.user_sys_id = gs.getUserID();
  var gr = new GlideRecord('sys_user');
  gr.addQuery('sys_id', data.user_sys_id);
  gr.query();

  while (gr.next()) {
    data.obj.name = gr.first_name.toString() + " " + gr.last_name.toString();
    data.obj.id = gr.user_name.toString();
    data.obj.photo = gr.photo.getDisplayValue() + '?t=small';
  }

})();