function FeedbackCardController($timeout) {
  var c = this;
  c.chosenFeedback = chosenFeedback;
  c.closeSurvery = closeSurvery;
  c.setRating = setRating;

  c.$onInit = function() {
    c.badRandom = Math.floor(Math.random() * 6) + 1;
    c.goodRandom = Math.floor(Math.random() * 21) + 80;
    c.showSurvey = true;
    c.stepId = 'one';
  };

  function chosenFeedback(feedback, icon) {
    c.stepId = 'three';
    c.selectedIcon = icon;
  }

  function closeSurvery() {
    c.showSurvey = false;
  }

  function setRating(event) {
    angular.element(event.target).addClass('selected animated rubberBand');
    $timeout(function() {
      angular.element('.emoji-rating').addClass('animated fadeOut');
    }, 1000);
  }
}