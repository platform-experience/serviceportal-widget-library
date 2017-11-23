# Approval Card

## Description

Displays a simple approval card with three buttons - **Accept**, **Reject** and **View**. Also displayed: user avatar, name, title and data relevant to the scenario where used.

## Screenshot
![alt text](../../images/approval.png "Approval Card Widget")

## Additional Information/Notes
This widget makes use of [pe-people-info](https://github.com/platform-experience/serviceportal-widget-library/tree/master/people-card/pe-people-info) widget to display user's avatar, name and title.
> Widget is included with the update set.

Widget is injected dynamically in client script controller.

---
## Installation
---
Download and install update set **[pe-approval-card.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/approve-card/pe-approval-card/pe-approval-card.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/jakarta-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Title` | Sets the title. | Destination Services |
| `Purpose` | Sets the purpose. | Relocation Package |
| `Icon` | Sets the Font Awesome icon. | fa fa-bell fa-2x |

---
## Platform Dependencies
---
> None
---
## Sample Data and Data Structures
---
> See 'Configuration' above

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
$pe-brand-success: #5cb85c !default;
$pe-brand-warning: #f0ad4e !default;
$pe-brand-danger: #d9534f !default;
$pe-brand-info: #5bc0de !default;
```