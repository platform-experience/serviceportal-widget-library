## Title - Cloud Sprawl Overview Snippet

## Description - Use Case

This snippet can be used to quickly obtain a card containing quick reference data and chart(s).

## Screenshots
![](../images/pe-cloud-sprawl-overview-snippet.png "Tabs Selector - No tab selection")

## Additional Information/Notes 
> None
---
## Installation
---
Download and install update set **[pe-cloud-sprawl-overview-snippet.u-update-set.xml](pe-cloud-sprawl-overview-snippet.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)
---
## Configuration
---
Widget Option Schema parameters:

**"Card Data"** JSON Data object

Example:

```javascript
    {
      "title": "Retail POS",
      "sluged": "retail_pos",
      "sub_title": "Marketing",
      "right_percent": "98%",
      "type": "aws",
      "thumbs": "up",
      "progress": "60%",
      "bottom_dollor": "$12,100",
      "right_attn_count": "3",
      "right_attn_color": "red"
    }
```
---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
> See Configuration above.

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