function($rootScope, $scope) {
  /* widget controller */
  var c = this;

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  c.initialEvents = [
    {
      description: 'Automated Event Correlation',
      time: '14:22',
      icon: 'fa fa-bolt fa-lg',
      stats: [
        { name: 'Events', value: 20 },
        { name: 'Sources', value: 5 }
      ]
    },
    {
      description: 'Automated Service Correlation',
      time: '14:22',
      icon: 'fa fa-bolt fa-lg',
      stats: [
        { name: 'In Total', value: 2 },
        { name: 'Tier 1 Service', value: 1, iconSuffix: 'fa fa-shopping-cart fa-lg' }
      ]
    },
    {
      description: 'Automated Risk Assessment',
      time: '14:23',
      icon: 'fa fa-bolt fa-lg',
      stats: [
        { value: '1.2M', icon: 'fa fa-usd fa-lg' },
        { value: '42K', icon: 'fa fa-users fa-lg' },
        { value: '3', icon: 'fa fa-globe fa-lg' }
      ]
    }
  ];

  c.title = 'Timeline'
  c.itemCount = Object.size(c.initialEvents);
  c.fadeOldEvents = true;
  c.shownInitialEvents = 0;


  $rootScope.$on('recovered', function () {
    c.recovered = true;
    c.shownInitialEvents = 0;
    $rootScope.$broadcast('countItems', {
      widget: 'pe-timeline',
      count: 3 + c.newEvents.length
    });
  });


  c.nextInitialEvent = function () {
    if (c.shownInitialEvents < c.initialEvents.length) {
      c.shownInitialEvents++
    } else {
      c.shownInitialEvents = 0;
      c.fadeOldEvents = true;
    }
  }

  c.expandInitialEvents = function () {
    c.shownInitialEvents = c.initialEvents.length;
    c.fadeOldEvents = false;
  }

  c.collapseInitialEvents = function () {
    c.shownInitialEvents = 0;
    c.fadeOldEvents = true;
  }

}