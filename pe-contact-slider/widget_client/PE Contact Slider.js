function ContactSliderController() {
  var c = this;
  c.nextPhase = nextPhase;

  function nextPhase() {
    angular.element('.contact-carousel').carousel('next');
    angular.element('.contact-carousel .hidden-photo').hide('animated fadeOut');
    angular.element('.contact-carousel .hidden-photo').show('animated fadeIn');
  }
}