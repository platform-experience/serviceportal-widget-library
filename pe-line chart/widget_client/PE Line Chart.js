function($scope, HighchartsConfigService) {
	var c = this;
	var hcsLineChart = new HighchartsConfigService(c.options, c.options.type, c.data);
	c.chartConfig = hcsLineChart.getChartConfig();
	hcsLineChart.get();
}