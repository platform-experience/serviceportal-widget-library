
# Lifecycle Events Progress Tracker

## Description

This widget allows an employee to easily visualize their HR Lifecycle Event progress such as Onboarding or Maternity Leave from the Employee Service Center homepage.

## Screenshot

![Lifecycle Events Progress Tracker](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-lifecycle-events-progress-tracker/images/pe-lifecycle-events-progress-tracker.png)

## Additional Information/Notes

This widget makes use of Donut Chart Two's angular directive.

## Installation

Download and install update set **[pe-lifecycle-events-progress-tracker.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-lifecycle-events-progress-tracker/pe-lifecycle-events-progress-tracker.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The widget's application scope is `Human Resources: Service Portal`. In order for the widget to access the data related to an HR Lifecycle Event, two Restricted Caller Access records will need to be created for the `Human Resources: Lifecycle Events` scope. If you are comfortable with creating Restricted Caller Access records, follow the **Primary Configuration Method**, otherwise use the **Alternate Configuration Method**.

### Primary Configuration Method

1. Change your scope to `Human Resources: Lifecycle Events`.

2. Navigate to `System Applications > Application Restricted Caller Access Privileges` and create a New record.

3. Enter in the following fields and then submit the record. This is for the HR Lifecycle Events Case \[sn_hr_le_case\] table.

| Field | Value |
| :--- | :--- |
| `Source Scope` | Human Resources: Service Portal |
| `Source Type` | Service Portal Widget |
| `Source Table` | Widget \[sp_widget\] |
| `Source` | Widget: Lifecycle Events Progress Tracker |
| `Status` | Allowed |
| `Target Scope` | Human Resources: Lifecycle Events |
| `Target Type` | Table |
| `Target` | Table: HR Lifecycle Events Case  |
| `Operation` | Read |

4. Create another similar Restricted Caller Access record with Activity Set Context \[sn_hr_le_activity_set_context\] as the `Target`.

| Field | Value |
| :--- | :--- |
| ... | ... |
| `Target` | Table: Activity Set Context |
| ... | ... |

5. Once these privileges are given, the widget is now be ready to be placed on a page.

### Alternate Configuration Method

1. Add the widget to a page to create a Restricted Caller Access record. Once you try to view the widget, an error will appear. If the widget is not showing up at all, you need to start a Lifecycle Event for your user.

![Configuration 1](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-lifecycle-events-progress-tracker/images/configuration-1.png)

2. Click "Allow Restricted Caller Access Link" in one of the error messages to get to the Restricted Caller Access record. Only an admin can view and modify these records.

![Configuration 2](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-lifecycle-events-progress-tracker/images/configuration-2.png)

3. Change your scope to `Human Resources: Lifecycle Events`.

4. Change the Status field from "Requested" to "Allowed" and save the record.

5. Go back to the page the widget is on and refresh. Another Restricted Caller Access error should appear and you will need repeat steps 2-4.

6. Once all the Restricted Caller Access privileges are created, you will be able to view the widget error-free.

### Widget Option Schema

| Option | Default Value |
| :--- | :--- |
| `Color` | #04B5E5 |
| `Background Color` | #E5E5E5 |
| `Donut Width` | 80 |
| `Percent Font Size` | 24px |
| `Font Weight` | 800 |

## Platform Dependencies

### SN System Tables

- sn_hr_core_task
- sn_hr_le_case
- sn_hr_le_activity_set_context

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
