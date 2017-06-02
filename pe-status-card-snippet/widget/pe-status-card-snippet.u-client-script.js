function StatusCardController(spUtil) {
  var c = this;

  c.$onInit = function() {
    getDonutChart();
    getPeopleInfo();
  };

  function getDonutChart() {
    spUtil.get('pe-donut-chart', {
      title: '',
      active_color: '#7eacf7',
      background_color: '#e6e8ed',
      show_icon: 'false',
      show_title: 'false',
      border_width: 16
    }).then(function(response) {
      c.data.donutChartWidget = response;
    });
  }

  function getPeopleInfo() {
    spUtil.get('pe-people-info', {
      user_sys_id: c.data.user_sys_id,
      show_job_title: 'false',
      show_call_and_chat: 'false',
      show_only_picture: 'false',
      show_text_below_picture: 'false'
    }).then(function(response) {
      c.data.peopleInfoWidget = response;
    });
  }
}