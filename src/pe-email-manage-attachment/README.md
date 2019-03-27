# Email Manage Attachment

## Description

> A simple widget to allow the management of attachments of a record and being able to email them from ServicePortal. The Update Set also contains a UI action that will copy all the attachments from a record and put them to an email attachment.

## Screenshot

![Email Manage Attachment](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-email-manage-attachment/images/pe-email-manage-attachment.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-email-manage-attachment.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-email-manage-attachment/pe-email-manage-attachment.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> Install the Update Set and navigate to *Service Portal > Service Portal Configuration* and select page editor. Find the *Ticket Form* page in the reference picker and click on it. Now, select the *Edit Ticket Form (ticket) page in Designer* link. Find the *Manage Attachments* widget and drag it above the baseline *Ticket Attachments* widget in the layout. Go to an open ticket in Service Portal and see the new widget. Add an attachment, then select the checkbox next to the attachments you would like to email outside of the platform if you wish to do so.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
