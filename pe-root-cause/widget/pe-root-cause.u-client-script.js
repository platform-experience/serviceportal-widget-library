function($scope) {
  /* widget controller */
  var c = this;

  c.incident = c.data.incident;

  c.stats = [
  	{ name: c.incident.ci.name, icon: '#server' },
  	{ name: 'Memory Leak', icon: '#computer-ram' },
  	{ name: 'Cause', icon: "#calendar", detail: c.incident.cause.number }
  ];

}