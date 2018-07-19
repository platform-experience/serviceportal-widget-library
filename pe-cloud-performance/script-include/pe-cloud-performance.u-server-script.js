var CloudPerformance = Class.create();
CloudPerformance.prototype = {
  initialize: function() {},

  getData: function() {
    var data = {
      widgetHeading: 'cloud performance',
      filter: 'all',
      firstBox: {
        number: '88%',
        bottomText: 'avg uptime'
      },
      secondBox: {
        number: '$1.2m',
        bottomText: 'revenue at risk'
      },
      thirdBox: {
        number: '17',
        bottomText: 'critical incident'
      }
    };
    return data;
  },

  type: 'CloudPerformance'
};
