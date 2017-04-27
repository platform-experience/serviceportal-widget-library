(function() {
    /*
      Data used to populate the chart's series
      - 'name' : represents the label values to identify the respective series
      - 'data:[Actual, Target]' : represents the two columns (chartOptions.XAxis.categories) 
        to be shown on the chart in a stack (chartOptions.plotOptions.column.stacking) 
    */
    data.frameTitle = options.frame_title;
	
    var sampleData = [{ name: 'RUN', data: [35, 25], color: '#1c5b7d', index: 1 },
        { name: 'CHANGE', data: [15, 25], color: '#e89033', index: 2 }
    ];
	
	/* Demo - Frame Title */
	/* Remove to use the widget's Frame Title Option property
	   or modify to hard code a title.
	*/
	data.frameTitle = "ORGANIZATIONAL SPEND ALIGNMENT";
    /*
      HighCharts API - Conifuration Options Reference
      http://api.highcharts.com/highcharts
    */
    var chartOptions = {
        chart: { type: 'column', reflow: false, height: 215 },
        exporting: { enabled: false },
        credits: { enabled: false },
        title: { text: null },
        xAxis: {
            categories: ['ACTUAL', 'TARGET'],
            lineWidth: 0,
            gridLineWidth: 0,
            tickWidth: 0,
            labels: { useHTML: true }
        },
        yAxis: {
            reversedStacks: false,
            allowDecimals: false,
            min: 0,
            max: 60, // Change to set the MAX value of the yAxis
            title: null,
            tickInterval: 20,
            gridLineWidth: 1,
            minorGridLineWidth: 0,
            labels: { format: '{value}M' }
        },
        tooltip: { enabled: false },
        plotOptions: {
            series: { borderWidth: 0, shadow: false },
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    style: { "color": "#000", "fontSize": "10px", "fontWeight": "bold", "textOutline": "0px" }
                }
            }
        },
        series: []
    };

    data.series = sampleData;
    data.chartOptions = chartOptions;

})();