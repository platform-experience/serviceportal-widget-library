## Progressive Form

## Description

This widget allows you to offer users a form submission experience which progresses through sections, rather than just showing them all at once. It also allows you to create related records directly from the same form.

Features:

- Works with new and existing records.
- Supports any record which has a “one to many” relationship. E.g. one Problem record can be linked to many Incident records. In this scenario, Problem would be the Master record, and Incident would be the Child record.
- UI Policy, UI Scripts, and Form Layouts are supported as per the out of box form widget.

## Screenshots
<kbd><img src="../images/pe-progressive-form.gif" /></kbd>

## Additional Information/Notes 
- This widget creates numbered ”Concertina” panels for each form section, plus an additional final panel for the child (related) records. The final panel also contains the submit button.
- As with the out of box "Form" widget, use the `sys_id` URL parameter to specify the record to open. Not supplying this parameter will result in a new master record being created upon submission of the form.
- Ensure the tables your editing have corresponding server-side UI Actions with the appropriate action names.

---
## Installation
---
Download and install update set **[pe-progressive-form.u-update-set.xml](pe-progressive-form.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/search?q=Load+a+customization+from+a+single+XML+file)   (<i>Select appropriate instance version</i>)

---
## Configuration
---
Widget Option Schema parameters:

- Master table name - The table name for the parent record- Child table name - The table name for the child records
- Master reference - The field name on the child table which points to the parent.
- View name - The view to render the form in
- “Delete” action name - The action name of the UI Action which will be triggered on deletion of a child record
- “Insert” action name - The action name of the UI Action which will be triggered on insert of a child record
- “Update” action name - The action name of the UI Action which will be triggered on update of a child record
- Redirect to - The URL  to redirect to after submission. Additional parameters pf_sys_id and pf_table will be added to allow identification of the record which was submitted.

---
## Platform Dependencies
---
> None

---
## Sample Data and Data Structures
---
No sample data provided.

---
## API Dependencies
---
<i>Dependencies are included and configured as part of the provided Update Set.</i>

- PRB827724-workaround

---
## CSS/SASS Variables
---
_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

`$button-background: #757575 !default;`<br />
`$button-color: #fff !default;`<br />
`$button-hover-background: #3a3f51 !default;`<br />
`$button-hover-color: #fff !default;`<br />