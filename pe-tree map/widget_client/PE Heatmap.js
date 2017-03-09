function($scope, HighchartsConfigService) {
	var c = this;
	var hcsHeatMap = new HighchartsConfigService(c.options, "heatmap", c.data);
	c.chartConfig = hcsHeatMap.getChartConfig();
	hcsHeatMap.get();
}