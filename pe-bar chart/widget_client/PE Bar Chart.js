function($scope, HighchartsConfigService) {
	var c = this;
	var chartType = c.options.bar_type;
	var hcs = new HighchartsConfigService(c.options, chartType, c.data);
	c.chartConfig = hcs.getChartConfig();
	hcs.get();
}