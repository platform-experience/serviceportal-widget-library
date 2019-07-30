# Sp Task Child Activity

## Description

Sp Task Child Activity is a powerful component for displaying not only a flat list of Tasks, but their children too. On both entities it will be possible to monitor their process flow in real time, manage approvals, attach and download any types of content allowed by the system attachments table, view/edit parent and child tasks on their configured default form view through a modal dialog. The component is also configured to offer the same capabilities on its mobile variant.

## Screenshot

![Main view on desktop](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-child-activity/images/pe-sp-task-child-activity-01.png)

![Main view on mobile, with the Process Flow still visible through popup](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-child-activity/images/pe-sp-task-child-activity-02.png)

![It is possible to approve or reject a request, and download the content attached to a task](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-child-activity/images/pe-sp-task-child-activity-03.png)

![The user can view/edit any tasks on a modal dialog after pressing the View link](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-child-activity/images/pe-sp-task-child-activity-04.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-sp-task-child-activity.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-task-child-activity/pe-sp-task-child-activity.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> The only required parameter is the sys_id of the parent task, and it can come from the input object in the Server Script or from the URL. The widget options allow an admin user to change the Bootstrap contextual/brand colors, select a task table, change the order of the task records in the list, and the form view used in the modal dialog.

## Platform Dependencies

### SN System Tables

> Task or any other table extended from Task.

### UI Dependencies

> This component requires [Proc Flow Popup](https://sc.service-now.com/snds?state=widget-detail&sys_id=f631a91bdb58bf80d589f4621f9619dd) as dependency, not included in this update set.

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> In addition to inherit the Theme configuration, below the other additional custom SASS variables:

``` scss
$x-pisn-sp-task-child-activity-state-past: $text-muted !default;
$x-pisn-sp-task-child-activity-state-current: $brand-success !default;
$x-pisn-sp-task-child-activity-state-future: $brand-primary !default;
```
