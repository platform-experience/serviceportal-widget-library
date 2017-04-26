function($scope, $interval, $filter) {
  /* widget controller */
  var c = this;
  var d = new Date();

  c.inc = $scope.data.inc;
  c.probabilityGauge = $scope.data.probabilityGauge;

  if (c.inc.opened_at) {
  	c.inc.opened_at_date = new Date(c.inc.opened_at);
  	c.inc.opened_at_string = $filter('date')(c.inc.opened_at_date, 'short');
  };
  if (c.inc.closed_at) {
  	c.inc.closed_at_date = new Date(c.inc.closed_at);
  	c.inc.closed_at_string = $filter('date')(c.inc.closed_at_date, 'short');
  };
  if (c.inc.resolved_at) {
  	c.inc.resolved_at_date = new Date(c.inc.resolved_at);
  	c.inc.resolved_at_string = $filter('date')(c.inc.resolved_at_date, 'short');
  };

  // console.log(c.inc);

  // fake close for demo/testing
  c.closeIncident = function(){
  	c.inc.closed_at = new Date();
  	c.inc.closed_at_string = $filter('date')(c.inc.closed_at, 'short');
  	c.inc.state = {
  		value: 7,
  		label: 'Closed'
  	}
  }

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