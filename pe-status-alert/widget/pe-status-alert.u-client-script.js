function StatusAlertController($filter, $interval) {
  var c = this;
  var d = new Date();

  c.$onInit = function() {
    c.probabilityGauge = c.data.probabilityGauge;
    getAlertDate();
    getOutageEta();
  };

  function getAlertDate() {
    c.alert = c.data.alert;
    if (c.alert.created_on) {
      c.alert.created_on_date = new Date(c.alert.created_on);
      c.alert.created_on_string = $filter('date')(c.alert.created_on_date, 'short');
    }
  }

  function getOutageEta() {
    var outageEta = new Date(d.getTime() + c.options.outage_eta * 60000);
    c.min_to_eta = Math.floor((outageEta.getTime() - d.getTime()) / 60000);
    if (c.min_to_eta < 0) {
      c.min_to_eta = 0;
    } else {
      $interval(function() {
        c.min_to_eta -= 1;
      }, 60000, c.min_to_eta);
    }
  }
}