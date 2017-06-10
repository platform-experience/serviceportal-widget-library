(function() {
  data.toJson = function(str) {
    if (typeof str === 'object') {
      str = JSON.parse(str);
    } else if (str !== undefined && str !== null) {
      str = JSON.parse(str);
    } else {
      str = '';
    }
    return str;
  };

  data.l_number = '$230';
  data.l_number_text = 'SPENT';
  data.graph_data = input.graph_data || options.graph_data;
  data.graph_data = data.toJson(data.graph_data);
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