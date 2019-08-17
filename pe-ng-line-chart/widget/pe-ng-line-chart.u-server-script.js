(function() {
  data.chartLabels = getChartLabels();
  data.chartOptions = getChartOptions();
  data.chartOverrides = getChartOverrides();
  data.chartSeries = getChartSeries();
  data.dataset = getDataSet();

  function dataSet(length, max) {
    return [randomData(length, max), randomData(length, max)];
  }

  function getChartLabels() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  }

  function getChartOverrides() {
    return [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  }

  function getChartSeries() {
    return ['Series A', 'Series B'];
  }

  function getDataSet() {
    return dataSet(getChartLabels().length, 100);
  }

  function getChartOptions() {
    return {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
  }

  function randomData(length, max) {
    return Array.apply(null, Array(length)).map(randomNumber(max));
  }

  function randomNumber(max) {
    return function() {
      return Math.floor(Math.random() * max);
    };
  }
})();
