function($scope, HighchartsConfigService) {
	var c = this;
	var hcs = new HighchartsConfigService(c.options, "pie", c.data);
	c.chartConfig = hcs.getChartConfig();
	hcs.get();
}