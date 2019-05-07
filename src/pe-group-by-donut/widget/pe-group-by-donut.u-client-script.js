function GroupByDonutController($scope, $rootScope) {
  var c = this;

  var dataLabels = { enabled: true };
  if (c.data.labelLength <= 2) {
    dataLabels = {
      enabled: true,
      formatter: function() {
        if (this.point.percentage > 4) {
          return c.data.prefix + this.point.key;
        }
        return '';
      },
      distance: -25,
      style: {
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        textOutline: '0px'
      }
    };
  }

  var chartOptions = {
    chart: {
      type: 'pie'
    },
    xAxis: {
      title: {
        text: null
      },
      labels: {
        rotation: 0
      }
    },
    credits: {
      enabled: false
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      }
    },
    plotOptions: {
      pie: {
        shadow: false,
        dataLabels: dataLabels
      },
      series: {
        innerSize: '60%',
        cursor: 'pointer'
      }
    },
    title: {
      align: 'center',
      verticalAlign: 'middle',
      y: 10,
      style: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: null // allow theming
      }
    },
    tooltip: {
      formatter: function() {
        return this.key + ' ' + c.data.pluralTableName + ': <b>' + this.y + '</b>';
      }
    }
  };

  buildChart(c.data.title, chartOptions, c.data.series[0].data);

  $scope.$on('sublime.tab.clicked', function(event, tabClicked) {
    c.server.get({
      tabClicked: tabClicked,
      seriesData: c.data.series[0].data.map(function(s) { return { value: s.key, name: s.name }; })
    }).then(function(r) {
      buildChart(r.data.title, chartOptions, r.data.series[0].data);
    });
  });

  function buildChart(title, options, seriesData) {
    $scope.chart = {
      test: true,
      options: options,
      series: [{
        data: seriesData
      }]
    };
    $scope.chart.options.title.text = title;

    // Create drilldowns
    $scope.chart.series[0].data.forEach(function(point) {
      point.events = {
        click: function(event) {
          $rootScope.$broadcast('sublime.query.selected', { query: point.q, title: point.t });
        }
      };
    });
  }
}