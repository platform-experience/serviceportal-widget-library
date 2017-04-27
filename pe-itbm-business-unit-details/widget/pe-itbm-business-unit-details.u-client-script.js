function BusinessUnitDetailsController($timeout) {
    /* widget controller */
    var bud = this;
    bud.showPrjIdx = -1;
    bud.showPrjRvwIdx = -1;

    bud.showPrj = function(idx) {
        bud.showPrjRvwIdx = -1;
        if (bud.showPrjIdx === idx) {
            bud.showPrjIdx = -1;
        } else {
            bud.showPrjIdx = idx;
        }
    };

    bud.showPrjRvw = function(idx) {
        bud.showPrjIdx = -1;
        if (bud.showPrjRvwIdx === idx) {
            bud.showPrjRvwIdx = -1;
        } else {
            goTo(idx);
            bud.showPrjRvwIdx = idx;
        }
    }

    function goTo(idx) {
        var goAnchor = $('#pnlReview' + idx);
        $('html, body').stop().animate({ scrollTop: goAnchor.offset().top }, 800);

    }
    $timeout(function() {
        var elROI = document.querySelectorAll("div.roi");
        var elRisk = document.querySelectorAll("div.risk");
        $.each(elROI, function(i, el) {
            buildGraph(el.id, 'ROI', '#70BE5A', parseInt(el.dataset.value));
        });
        $.each(elRisk, function(i, el) {
            buildGraph(el.id, 'RISK SCORE', '#e89033', parseInt(el.dataset.value));
        });
    });

    function buildGraph(cntr, title, color, val) {
        var charts = [];
        var chtVal = 50;
        var gap = (100 - chtVal);

        var plotOpts = bud.data.chartOptions;

        plotOpts.subtitle.text = title;
        plotOpts.title.text = (val + '%');
        plotOpts.series = [{ data: [
                ['', val],
                ['', (100 - val)]
            ] }];
        plotOpts.colors = [color, '#F0F0F0'];
        var x = new Highcharts.Chart(cntr, plotOpts, function(chartObj) {
            chartObj.title.update({ text: (val + '%') });
        });

    }
}