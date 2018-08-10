function CloudPerformanceController() {
  var c = this;

  c.$onInit = function() {
    setOptions();
  };

  function setOptions() {
    c.title = c.options.title && c.options.title.length > 0 ? c.options.title : c.data.cloudData.widgetHeading;
  }
}
