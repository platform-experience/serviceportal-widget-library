(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.toJson = function (str) {
    if (typeof str == 'string') {
      str = JSON.parse(str);
    }
    if (typeof str == 'object') {
      ret = true;
      try {
        JSON.parse(str);
      } catch (e) {
        ret = false;
      }
      if (ret === true) {
        str = JSON.parse(str);
      }
    } else if (str != undefined && str !== null) {
      str = JSON.parse(str);
    } else {
      str = JSON.parse('');
    }
    return str;
  };

  data.primary_color = input.primary_color || options.primary_color;
  data.background_color = input.background_color || options.background_color;
  data.chart_width = input.chart_width || options.chart_width;
  data.font_size = input.font_size || options.font_size;
  data.font_weight = input.font_weight || options.font_weight;
  data.chart_data = input.chart_data || options.chart_data;
  data.chart_data = data.toJson(data.chart_data);

})();