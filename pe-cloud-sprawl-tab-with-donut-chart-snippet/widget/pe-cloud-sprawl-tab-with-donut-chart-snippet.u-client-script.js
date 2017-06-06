function TabChartController(spUtil) {
  var c = this;

  c.$onInit = function() {
    getDonutChart1();
    getDonutChart2();
    c.secondTab = c.data.secondTab;
    c.userOne = c.data.userOne;
    c.userTwo = c.data.userTwo;
    c.selectedTab = 'unaccounted';
  };

  function getDonutChart1() {
    spUtil.get('pe-donut-chart-wizard', c.data.chart1).then(function(response) {
      c.data.donutChartWidget1 = response;
    });
  }

  function getDonutChart2() {
    spUtil.get('pe-donut-chart-wizard', c.data.chart2).then(function(response) {
      c.data.donutChartWidget2 = response;
    });
  }
}