<div class='osa-title'>{{::osa.data.frameTitle}}</div>
<hr class='osa-hr' />
<div class='osa-spacer'></div>
<div class='osa-frame'>
    <div id='chtSpendLimit'></div>
</div>otOpts.series = osa.data.series;
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