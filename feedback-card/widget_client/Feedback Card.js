function ($timeout, $rootScope) {
  var c = this;

  c.showSurvey = true;
  c.stepId = 'one';
  c.stepMessages = [
    'We would like you to take a survey to see how we are doing.',
    'How would you rate your overall experience using this?',
    'People like you rate this service at:'
  ];

  c.goodrandom = Math.floor(Math.random() * 21) + 80;
  c.badrandom = Math.floor(Math.random() * 6) + 1;

  c.$onInit = function () {
    c.setRating = setRating;
  };

  c.gotoNext = function (step, icon) {
    c.stepId = step;
    c.selectedIcon = icon;
  }

  c.closeSurvery = function () {
    c.showSurvey = false;
  }

  function setRating(event) {
    angular.element(event.target).addClass('selected animated rubberBand');
    $timeout(function () {
      angular.element('.emoji-rating').addClass('animated fadeOut');
    }, 1000);
  }
}