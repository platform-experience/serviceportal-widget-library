(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  data.card = {
    filter: 'all',
    donut_data: {
      total: 100,
      completed: 85,
      display_value: '21%',
      sub_title: 'NONCOMPLIANT spend',
      bottom_text: '$50k UNACCOUNTED'
    },
    second_box: {
      top_text: 'savings',
      middle_text: '$69k',
      sub_title: '47 RECLAIMED VMs'
    },
    third_box: {
      big_text: '78%',
      sub_title: 'UTILIZATION RATE',
      sub_sub_title: '3% M/M'
    }
  };

  data.chart = {
    primary_color : '#e74c3c',
    background_color : '#9b9b9b',
    chart_width : '60',
    font_size : '18px',
  font_weight : '600'
  };

  data.chart_data = {
    label: '21%',
    current: 1,
    total: 5
  };

})();