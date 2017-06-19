## Title - Summary Data Snippet

## Description - Use Case

This snippet can be used to quickly obtain a card containing sub sections with data and a sample charts.

## Screenshots
![](../images/pe-summary-data-snippet.png)

## Additional Information/Notes 
This widget makes use of [pe-donut-chart-wizard](https://github.com/platform-experience/serviceportal-widget-library/tree/master/Charts/pe-donut-chart-wizard) and is included in the update set.

Donut Chart Wizards widget is injected dynamically in client controller.

---
## Installation
---
Download and install update set **[pe-cloud-sprawl-vm-summary-snippet.u-update-set.xml](pe-cloud-sprawl-vm-summary-snippet.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:
> None
---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
Sample data is provided as JSON objects in the Server Script.
``` javascript
  data.card = {
    filter: 'all',
    donut_data: {
      total: 100,
      completed: 85,
      display_value: '21%',
      sub_title: 'NONCOMPLIANT spend',
      bottom_text: '$50k UNACCOUNTED'
    },
    second_box: {
      top_text: 'savings',
      middle_text: '$69k',
      sub_title: '47 RECLAIMED VMs'
    },
    third_box: {
      big_text: '78%',
      sub_title: 'UTILIZATION RATE',
      sub_sub_title: '3% M/M'
    }
  };

  data.chart = {
    primary_color: '#e74c3c',
    background_color: '#9b9b9b',
    chart_width: '60',
    font_size: '18px',
    font_weight: '600'
  };

  data.chart_data = {
    label: '21%',
    current: 1,
    total: 5
  };

```


---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._
> None