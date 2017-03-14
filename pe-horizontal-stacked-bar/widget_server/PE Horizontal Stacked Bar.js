(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.l_number = '$230';
  data.l_number_text = 'SPENT';
  data.graph_data = input.graph_data || options.graph_data;
  if (data.graph_data !== null && data.graph_data !== undefined) {
    data.graph_data = JSON.parse(data.graph_data);
  }

  data.r_info_color = 'red';
  data.r_info_type = 'bar';
  data.r_info_bar_title = '5 days to $0';
  data.r_info_bar_remaining = '46';
  data.r_info_total = '276';
  data.r_number = '';
  data.r_number_text = '';
  data.r_info_remaining = 20;
  data.r_info_total = 100;
})();