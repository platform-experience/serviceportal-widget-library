## Synopsis: PE CSM Dashboard Expandable

![alt text](../images/pe-csm-dashboard-expandable-card.png "PE CSM Dashboard Expandable")


This widget can be used to display customer status.

***

## Installation

You can just download the update set **pe-csm-dashboard-expandable.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

**Important note: This widget makes use of [pe-solid-gauge](https://github.com/platform-experience/serviceportal-widget-library/tree/master/highcharts/pe-solid-gauge) ,this widget is already part of the update set.

Solid Gauge is injected dynamically in client controller.

```javascript
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
```

Clicking anywhere in div will show the extended view, here you can inject another widget.




