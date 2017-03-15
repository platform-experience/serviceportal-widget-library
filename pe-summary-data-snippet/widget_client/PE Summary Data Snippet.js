function SummaryDataSnippet(spUtil) {
  /* widget controller */
  var c = this;

  spUtil.get('pe-donut-chart-wizard', {
    primary_color: c.data.chart.primary_color,
    background_color: c.data.chart.background_color,
    chart_width: c.data.chart.chart_width,
    font_size: c.data.chart.font_size,
    font_weight: c.data.chart.font_weight,
    chart_data: c.data.chart_data
  }).then(function (response) {
    c.data.embedded_widget = response;
  });

}