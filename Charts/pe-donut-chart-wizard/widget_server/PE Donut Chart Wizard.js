(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.primary_color = input.primary_color || options.primary_color;
  data.background_color = input.background_color || options.background_color;
  data.chart_width = input.chart_width || options.chart_width;
  data.font_size = input.font_size || options.font_size;
  data.font_weight = input.font_weight || options.font_weight;
  data.chart_data = input.chart_data || options.chart_data;
  data.chart_data = JSON.parse(data.chart_data);


})();