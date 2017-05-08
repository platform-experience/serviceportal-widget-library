function($scope, $interval, $filter) {
  /* widget controller */
  var c = this;
  var d = new Date();

  c.alert = c.data.alert;
  c.probabilityGauge = c.data.probabilityGauge;

  if (c.alert.created_on) {
  	c.alert.created_on_date = new Date(c.alert.created_on);
  	c.alert.created_on_string = $filter('date')(c.alert.created_on_date, 'short');
  };

  // get minutes to possible outage, else default to count down from 30
  var default_min_to_eta = 30;
  if (c.options.outage_eta) {
	  var outage_eta = new Date(c.options.outage_eta);
	} else {
		var outage_eta = new Date( d.getTime() + default_min_to_eta*60000 );
	}

  c.min_to_eta = Math.floor( ( outage_eta.getTime() - d.getTime() ) / 60000 );
  if (c.min_to_eta < 0) {
  	c.min_to_eta = 0;
  } else {
  	$interval( function(){
	  	c.min_to_eta -= 1;
	  }, 60000, c.min_to_eta);
  }  

}