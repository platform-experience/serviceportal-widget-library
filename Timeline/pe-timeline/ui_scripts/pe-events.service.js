(function() {
  'use strict';

  function eventsService() {
    var service = {
      getInitialEvents: getInitialEvents
    };
    return service;

    function getInitialEvents() {
      var events = [{
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
      return events;
    }
  }

  angular
    .module('pe-timeline')
    .service('eventsService', eventsService);
})();