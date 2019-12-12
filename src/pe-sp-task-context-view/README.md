# SP Task Context View

## Description

SP Task Context View widget allows to present tasks with different views (custom or OOB widgets) basing on their type. The types can be defined by the admin users in the solution table specifying:

* sys_class_name, the table name inheriting the Task table (mandatory).

* an encoded query (optional).

* widget to use and relative additional options. If not used, the solution will use the OOB Form widget.

The SP Task Context View solution provides tables, under module "SP Context View", where the Admin user can define the parameters above and more.


## Screenshot

![SP Task Context View](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-context-view/images/pe-sp-task-context-view-01.png)

![SP Task Context View with list collapsed](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-context-view/images/pe-sp-task-context-view-02.png)

![SP Context View, definition in classic UI](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-task-context-view/images/pe-sp-task-context-view-03.png)

## Installation

Download and install update set **[pe-sp-task-context-view.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-task-context-view/pe-sp-task-context-view.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

The widget has the following options available:

* Base filter (encoded query)

* Columns/fields to display in the records list

* Limit for the total records to show in the list

* Order By

* Order Direction

* Title

* Short description (subtitle)

* Default widget, for when the selected record doesn't belong to any view defined

* Default widget options

* Message for when no record is selected

### SN System Tables

* x_pisn_sp_ctx_view_sp_context_view, table containing the association of records and view/widget through encoded query and table/task type.

* x_pisn_sp_ctx_view_sp_contextual_states, table containing the mapping between the Bootstrap contextual states and State values for the defined view record and task type.

### UI Dependencies

* Animate.css

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

* $x_pisn_sp_ctx_view-height

* $x_pisn_sp_ctx_view-loading-animation
