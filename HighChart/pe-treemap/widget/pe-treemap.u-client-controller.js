function($scope, HighchartsConfigService) {
	var c = this;
	var hcsTreemap = new HighchartsConfigService(c.options, "treemap", c.data);
	c.chartConfig = hcsTreemap.getChartConfig();
	hcsTreemap.get();
}