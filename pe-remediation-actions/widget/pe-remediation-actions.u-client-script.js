function($scope) {
  /* widget controller */
  var c = this;

  c.incident = c.data.incident;

  c.actions = [
  	{
  		name: "Rollback",
  		iconClasses: "fa fa-refresh",
  		confidence: 98,
  		duration: 10,
  		change_request: 'CHG000123',
  		href: 'https://www.example.com'
  	},
  	{
  		name: "Fix",
  		iconClasses: "fa fa-wrench",
  		confidence: 76,
  		duration: 30,
  		change_request: 'CHG000123',
  		href: 'https://www.example.com'
  	},
  	{
  		name: "Failover",
  		iconClasses: "fa fa-refresh",
  		confidence: 35,
  		duration: 90,
  		change_request: 'CHG000123',
  		href: 'https://www.example.com'
  	}
  ];

}