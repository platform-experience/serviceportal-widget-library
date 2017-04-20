function peCSMDashboard(spUtil) {
    var c = this;

    spUtil.get('solid-gauge-arc', {
        options: {
            advance: JSON.stringify({

                "options": {
                    "chart": {
                        "width": "200",
                        "height": "150"
                    },
                    "exporting": {
                        "enabled": false
                    },
                    "pane": {
                        "startAngle": -90,
                        "endAngle": 90,
                        "background": {
                            "shape": "arc"
                        }
                    },
                    "yAxis": {
                        "softMin": 0,
                        "softMax": 100,
                        "title": {
                            "enabled": false
                        }
                    },
                    "plotOptions": {
                        "solidgauge": {
                            "dataLabels": {
                                "enabled": false
                            }
                        }

                    }
                },
                "title": {
                    "text": null
                }


            })


        }
    }).then(function(response) {
        c.data.embedded_widget = response;
    });
}