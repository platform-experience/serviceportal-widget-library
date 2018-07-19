# Feedback Card

## Description

This widget can be used to create a simple emoji rating/feedback card.

## Screenshots

### Step 1
![alt text](../images/pe-feedback-card-screenshot-01.png "Timeline Widget - Step 1")
### Step 2
![alt text](../images/pe-feedback-card-screenshot-02.png "Timeline Widget- Step 2")
### Step 3
![alt text](../images/pe-feedback-card-screenshot-03.png "Timeline Widget- Step 3")

## Additional Information/Notes
> None
---
## Installation
---
Download and install update set **[pe-feedback-card.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-feedback-card/pe-feedback-card.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Step 1 message` | Message for step 1 | We would like you to take a survey to see how we are doing. |
| `Step 2 message` | Message for step 2 | How would you rate your overall experience using this? |
| `Step 3 message` | Message for step 3 | People like you rate this service at: |

---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
> None
---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None
---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-brand-primary: #337ab7 !default;
$pe-brand-text-color: #fff !default;
$pe-brand-text-size-normal: 15px !default;
```