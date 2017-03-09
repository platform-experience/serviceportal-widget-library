function($scope, $timeout, HighchartsConfigService) {
	var c = this;

	var hcs = new HighchartsConfigService(c.options, "solidgauge", c.data);
	c.chartConfig = hcs.getChartConfig();
	hcs.get();
}