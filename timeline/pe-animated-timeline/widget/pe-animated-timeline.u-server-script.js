(function() {
  var gr = GlideRecord('u_pe_animated_timeline');
  gr.orderBy('u_order');
  gr.query();
  var items = [];
  var obj;
  while (gr.next()) {
    obj = {};
    obj.name = gr.u_name.toString();
    obj.subtitle = gr.u_subtitle.toString();
    obj.html = gr.u_html_description.toString();
    obj.delay = parseInt(gr.u_delay.toString());
    obj.fail = gr.u_fail.toString() === 'true';
    obj.end = gr.u_end.toString() === 'true';
    obj.order = parseInt(gr.u_order.toString());
    items.push(obj);
  }
  data.items = items;
})();