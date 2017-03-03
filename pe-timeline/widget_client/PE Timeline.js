function ($rootScope, $scope) {
  /* widget controller */
  var c = this;
	
  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  c.initialEvents = [{
    description: 'Automated Event Correlation',
    leftDescription: '14:22',
    icon: 'fa fa-bolt fa-lg',
    color: '#dbcb33',
    stats: [{
      name: 'Events',
      value: 20
    },
    {
      name: 'Sources',
      value: 5
    }
    ]
  },
  {
    description: 'Automated Service Correlation',
    leftDescription: '14:22',
    icon: 'fa fa-bolt fa-lg',
    color: '#d86431',
    stats: [{
      name: 'In Total',
      value: 2
    },
    {
      name: 'Tier 1 Service',
      value: 1,
      iconSuffix: 'fa fa-shopping-cart fa-lg'
    }
    ]
  },
  {
    description: 'Automated Risk Assessment',
    leftDescription: '14:23',
    icon: 'fa fa-bolt fa-lg',
    color: '#903f5c',
    stats: [{
      value: '1.2M',
      icon: 'fa fa-usd fa-lg'
    },
    {
      value: '42K',
      icon: 'fa fa-users fa-lg'
    },
    {
      value: '3',
      icon: 'fa fa-globe fa-lg'
    }
    ]
  }
  ];

  c.title = c.data.title;
  c.itemsCount = Object.size(c.initialEvents);
  c.fadeOldEvents = false;
  c.shownInitialEvents = c.data.initial_elements;
	if (c.shownInitialEvents === undefined){
		c.shownInitialEvents = 0;
	}
	
	c.nextInitialEvent = function () {
    if (c.shownInitialEvents < c.initialEvents.length) {
      c.shownInitialEvents++
    } else {
      c.shownInitialEvents = 0;
      c.fadeOldEvents = false;
    }
  }

  c.expandInitialEvents = function () {
    c.shownInitialEvents = c.initialEvents.length;
    c.fadeOldEvents = false;
  }

  c.collapseInitialEvents = function () {
    c.shownInitialEvents = 0;
    c.fadeOldEvents = false;
  }

}