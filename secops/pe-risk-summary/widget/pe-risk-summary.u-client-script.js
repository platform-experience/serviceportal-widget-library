function RiskSummaryController($scope, HighchartsConfigService) {
  var c = this;

  c.chartConfig = {
    options: {
      chart: {
        backgroundColor: 'transparent',
        spacing: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        type: 'pie',
        height: 200
      },
      exporting: {
        enabled: false
      },
      title: '',
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          size: '70%',
          center: [55, 40],
          colors: [
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
              stops: [[0, '#FF2828'], [1, '#D20E0E']]
            },
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
              stops: [[0, '#FF9C1A'], [1, '#F97915']]
            },
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
              stops: [[0, '#4CC890'], [1, '#259757']]
            }
          ], //"#FF2828","#FF9C1A","#4CC890"}],
          borderColor: 'transparent',
          dataLabels: {
            enabled: true,
            distance: -25,
            format: '{point.y}',
            color: '#161F4E',
            style: {
              textOutline: 'none'
            }
          },
          showInLegend: true
        }
      },
      legend: {
        symbolPadding: 2,
        margin: 0,
        padding: 3,
        width: '100%',
        y: -50,
        squareSymbol: false,
        symbolHeight: 10,
        symbolWidth: 6,
        symbolRadius: 2
      }
    },
    series: [
      {
        colorByPoint: true,
        data: [
          ['High', c.data.values.high],
          ['Med', c.data.values.medium],
          ['Low', c.data.values.low]
        ]
      }
    ],
    credits: {
      enabled: false
    }
  };
}
