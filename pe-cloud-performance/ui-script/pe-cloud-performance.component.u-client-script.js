(function() {
  'use strict';

  var cloudPerformance = {
    bindings: {
      data: '@',
      options: '@'
    },
    controller: function() {
      this.$onInit = function() {
        this.getData();
      };

      this.getData = function() {
        this.cloudData = JSON.parse(this.data);
      };
    },
    template: [
      '<div class="cloud-performance-wrapper">',
      '<div class="heading">',
      '<p>{{::$ctrl.options}}</p>',
      '</div>',
      '<div class="vms cloud-performance">',
      '<div class="each-box unaccounted-box">',
      '<div class="top-box">',
      '<div class="arrow-up-green"></div>',
      '<p class="middle-big-text">{{::$ctrl.cloudData.firstBox.number}}</p>',
      '</div>',
      '<p class="top-title bottom-part">{{::$ctrl.cloudData.firstBox.bottomText}}</p>',
      '</div>',
      '<div class="each-box middle-box">',
      '<div class="top-box">',
      '<div class="arrow-up-red"></div>',
      '<p class="middle-big-text">{{::$ctrl.cloudData.secondBox.number}}</p>',
      '</div>',
      '<p class="top-title">{{::$ctrl.cloudData.secondBox.bottomText}}</p>',
      '</div>',
      '<div class="each-box">',
      '<div class="top-box">',
      '<div class="arrow-down-red"></div>',
      '<p class="middle-big-text">{{::$ctrl.cloudData.thirdBox.number}}</p>',
      '</div>',
      '<p class="top-title">{{::$ctrl.cloudData.thirdBox.bottomText}}</p>',
      '</div>',
      '</div>',
      '</div>'
    ].join('')
  };

  angular
    .module('cloudPerformance')
    .component('cloudPerformance', cloudPerformance);
})();

