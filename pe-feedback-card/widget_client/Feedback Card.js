function ($timeout) {
  var c = this;

  c.showSurvey = true;
  c.stepId = 'one';
  
  c.goodrandom = Math.floor(Math.random() * 21) + 80;
  c.badrandom = Math.floor(Math.random() * 6) + 1;

  c.$onInit = function () {
    c.setRating = setRating;
  };

  c.chosenFeedback = function (feedback, icon) {
    console.log(feedback);
    c.stepId = "three";
    c.selectedIcon = icon;
  };

  c.closeSurvery = function () {
    c.showSurvey = false;
  };

  function setRating(event) {
    angular.element(event.target).addClass('selected animated rubberBand');
    $timeout(function () {
      angular.element('.emoji-rating').addClass('animated fadeOut');
    }, 1000);
  }
}