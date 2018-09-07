# Email Client and Attachment Management

## Description

A simple way to allow the out of box email client to contain attachments.

## Screenshot

[Manage Attachments](../images/pe-manage-attachments.png)

## Additional Information/Notes

The update set gives two ways for this function to be used. The first is a widget that is available to be used on Service portal. The second is a UI action that is put on the out of box form. A example is given in the update on the incident form.

To use on ServicePortal it requires that there be 2 parameters in the url. These parameters are sys_id and table, they can optionally be filled out in the options.	

## Installation

Download and install update set **[pe-manage-attachments.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-manage-attachments/pe-manage-attachments.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Record ID` | sys_id of the record | |
| `Record Table` | Table Name for the record | |

## Platform Dependencies

### SN System Tables

> None

## Sample Data and Data Structures

> See 'Configuration' above

## Dependencies
> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None