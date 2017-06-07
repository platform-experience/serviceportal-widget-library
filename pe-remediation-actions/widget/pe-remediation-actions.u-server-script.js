(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.alert = options.alert || serverOptions.alert;

  var getAlert = function(gr) {
    return {
      sys_id: gr.sys_id.toString(),
      state: gr.state.toString()
    };
  };

  var alertGR, alert;
  if (options.alert) {
    alertGR = new GlideRecord('em_alert_anomaly');
    alertGR.get(options.alert);
    alert = getAlert(alertGR);
  } else {
    alertGR = new GlideRecord('em_alert_anomaly');
    alertGR.orderByDesc('sys_created_on');
    alertGR.query();
    alertGR.next();
    alert = getAlert(alertGR);
  }

  data.alert = alert;
})();