function OrgSpendAlignmentController() {
    /* widget controller */
    var osa = this;

    var plotOpts = osa.data.chartOptions;
    plotOpts.series = osa.data.series;
    plotOpts.plotOptions.column.dataLabels.formatter = function() { return "$" + this.y + "M"; };

    var chtSpnLmt = new Highcharts.Chart('chtSpendLimit', plotOpts, function(chtObj) {
        $.each(chtObj.series, function(i, s) {
            /* Need to shift the column labels Left/Right of the columns for readability ease */
            $.each(s.data, function(i, dpoint) {
                var shiftX = (dpoint.pointWidth / 2) + (dpoint.dataLabel.width / 2);
                if (dpoint.index == 0) {
                    dpoint.dataLabel.attr({ x: (dpoint.dataLabel.x - shiftX) });
                }
                if (dpoint.index == 1) {
                    dpoint.dataLabel.attr({ x: (dpoint.dataLabel.x + shiftX) });
                }
            });
        });
    });
}