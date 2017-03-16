function($scope, HighchartsConfigService) {
	var c = this;
	var hcs = new HighchartsConfigService(c.options, c.options.type, c.data);
	c.chartConfig = hcs.getChartConfig();
	hcs.get();
}