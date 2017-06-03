(function() {
  'use strict';

  function tabService() {
    var service = {
      getTabs: getTabs
    };
    return service;

    function getTabs() {
      var tabs = {
        firstTab: {
          name: 'Reclaimed vms',
          badgeNumber: 15,
          badgeColor: 'bg-red'
        },
        secondTab: {
          name: 'Expiring soon',
          badgeNumber: 5,
          badgeColor: 'bg-orange'
        },
        thirdTab: {
          name: 'new vms',
          badgeNumber: 10,
          badgeColor: 'bg-green'
        }
      };
      return tabs;
    }
  }

  angular
    .module('pe-dynamic-tabs')
    .service('tabService', tabService);
})();