function($rootScope, $scope) {
  /* widget controller */
  var c = this;

  c.incident = c.data.incident;
  // console.log(c.incident);

  c.stats = [
  	{ name: 'Services', value: c.incident.business_services.length },
  	{ name: '$ Per Hour', value: c.incident.all_revenue },
  	{ name: 'Users', value: c.incident.all_users.length }
  ];

}