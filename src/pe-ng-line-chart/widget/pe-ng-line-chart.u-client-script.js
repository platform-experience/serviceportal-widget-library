function LineChartController() {
  var c = this;

  c.$onInit = function() {
    setChartOptions();
  };

  function setChartOptions() {
    c.labels = c.data.chartLabels;
    c.series = c.data.chartSeries;
    c.data = c.data.dataset;
    c.datasetOverride = c.data.chartOverrides;
    c.options = c.data.chartOptions;
  }
}
