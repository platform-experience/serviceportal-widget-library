(function() {
  var grTimeline = GlideRecord('u_pe_animated_timeline');
  grTimeline.orderBy('u_order');
  grTimeline.query();
  var items = [];
  var obj;
  while (grTimeline.next()) {
    obj = {};
    obj.name = grTimeline.u_name.toString();
    obj.subtitle = grTimeline.u_subtitle.toString();
    obj.html = grTimeline.u_html_description.toString();
    obj.delay = parseInt(grTimeline.u_delay.toString());
    obj.fail = grTimeline.u_fail.toString() === 'true';
    obj.end = grTimeline.u_end.toString() === 'true';
    obj.order = parseInt(grTimeline.u_order.toString());
    items.push(obj);
  }
  data.items = items;
})();