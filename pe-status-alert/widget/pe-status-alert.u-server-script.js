(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
    options.alert_sysid = options.alert_sysid || serverOptions.alert_sysid;
    options.probability = options.probability || serverOptions.probability || 67;
    options.outage_eta = options.outage_eta || serverOptions.outage_eta || 30;

    var getAlert = function(rec) {
        return {
            sys_id: rec.sys_id.toString(),
            number: rec.number.toString(),
            created_on: rec.sys_created_on.toString(),
            description: rec.description.toString(),
            state: rec.state.toString()
        };
    };

    var alertGR, alert;
    if (options.alert_sysid) {
        alertGR = new GlideRecord('em_alert_anomaly');
        if (alertGR.get(options.alert)) {
            alert = getAlert(alertGR);
        }
    } else {
        alertGR = new GlideRecord('em_alert_anomaly');
        //alertGR.addEncodedQuery('state!=Closed');
        alertGR.orderByDesc('sys_created_on');
        alertGR.query();
        if (alertGR.next()) {
            alert = getAlert(alertGR);
        }
    }
    data.alert = alert;

    data.probabilityGauge = $sp.getWidget("pe-solid-gauge", {

        script_include: 'PEChartData',
        function_name: 'getData',
        param1: options.probability,

        advance: JSON.stringify({
            options: {
                title: {
                    text: null
                },
                chart: {
                    height: 140,
                    width: 140,
                    backgroundColor: null
                },
                pane: {
                    background: {
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderColor: null,
                        shape: 'solid',
                        innerRadius: '60%',
                        outerRadius: '100%'
                    }
                },
                exporting: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    tickAmount: 0,
                    tickWidth: 0,
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, 'rgba(255,255,255,1)']
                    ]
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            format: "{y}%",
                            color: "white",
                            style: {
                                fontFamily: "'SourceSansPro', Helvetica, Arial, sans-serif",
                                fontSize: "24px",
                                fontWeight: "400"
                            },
                            y: -20
                        }
                    }
                }
            }

        })

    });

})();