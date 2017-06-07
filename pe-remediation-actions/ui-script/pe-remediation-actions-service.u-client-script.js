(function() {
  'use strict';

  function actionService() {
    var service = {
      getActions: getActions
    };
    return service;

    function getActions() {
      var actions = [{
        name: 'Rollback',
        iconClasses: 'fa fa-refresh',
        confidence: 98,
        duration: 10,
        change_request: 'CHG000123',
        href: 'https://www.example.com'
      },
      {
        name: 'Fix',
        iconClasses: 'fa fa-wrench',
        confidence: 76,
        duration: 30,
        change_request: 'CHG000123',
        href: 'https://www.example.com'
      },
      {
        name: 'Failover',
        iconClasses: 'fa fa-refresh',
        confidence: 35,
        duration: 90,
        change_request: 'CHG000123',
        href: 'https://www.example.com'
      }];
      return actions;
    }
  }

  angular
    .module('pe-remediation-actions')
    .service('actionService', actionService);
})();