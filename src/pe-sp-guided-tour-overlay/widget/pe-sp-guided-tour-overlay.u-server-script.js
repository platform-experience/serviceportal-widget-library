(function() {
  input = input || {};
  data.tour = {};
  data.tour.target_refs = [];

  if(!input.tour_id) {
    return;
  }

  data.tour.sys_id = input.tour_id;

  var gr = new GlideRecord('sys_embedded_tour_step');
  gr.addQuery('guide=' + data.tour.sys_id + '^step_type=step');
  gr.orderBy('order');
  gr.query();
  while (gr.next()) {
    data.tour.target_refs.push({
      sys_id: gr.getUniqueValue(),
      css: gr.getDisplayValue('action_target_ref.manual_css'),
      element_type: gr.getDisplayValue('action_target_ref.element_type')
    });
  }
})();
