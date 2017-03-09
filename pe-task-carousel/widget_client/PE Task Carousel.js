function TaskCarouselController() {
  var c = this;
  c.prevPhase = prevPhase;
  c.nextPhase = nextPhase;
  c.setDefaults = setDefaults;
  c.toggleTasks = toggleTasks;

  c.$onInit = function() {
    setDefaults();
  };

  function prevPhase() {
    angular.element('.carousel').carousel('prev');
  }

  function nextPhase() {
    angular.element('.carousel').carousel('next');
  }

  function setDefaults() {
    c.isToggled = false;
    c.toggleState = 'more';
  }

  function toggleTasks() {
    c.toggleState = c.isToggled === true ? 'more' : 'less';
    c.isToggled = !c.isToggled;
  }
}