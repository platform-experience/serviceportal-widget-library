function TaskCarouselController(spUtil) {
  var c = this;
  c.prevPhase = prevPhase;
  c.nextPhase = nextPhase;
  c.setDefaults = setDefaults;
  c.toggleTasks = toggleTasks;

  c.$onInit = function() {
    activateCharts();
    setDefaults();
  };

  function activateCharts() {
    var count = 0;
    c.sparkline = [];
    while (count !== 18) {
      if (!c.sparkline[count]) {
        spUtil.get('pe-sparkline', {
          options: {
            gradientEnd: 'rgba(0, 59, 210, 1)',
            gradientStart: 'rgba(0, 201, 199, 1)'
          }
        }).then(function(response) {
          c.sparkline.push(response);
        });
      }
      count++;
    }
  }

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