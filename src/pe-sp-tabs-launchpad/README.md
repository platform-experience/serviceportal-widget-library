# Sp Tabs Launchpad

## Description

Tabs component with options and SASS variables for an easy customization. It is using a provided API / Script Include and Service Portal Menu Items as data source.

## Screenshot

![Sp Tabs Launchpad with responsive apps layout](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-tabs-launchpad/images/pe-sp-tabs-launchpad-01.png)

![Sp Tabs Launchpad with default responsive and predefined Bootstrap table](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-tabs-launchpad/images/pe-sp-tabs-launchpad-02.png)

![Sp Tabs Launchpad with an embedded widget](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-sp-tabs-launchpad/images/pe-sp-tabs-launchpad-03.png)

## Additional Information/Notes

> None

## Installation

Download and install update set **[pe-sp-tabs-launchpad.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-sp-tabs-launchpad/pe-sp-tabs-launchpad.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> Instantiate the widget on any Service Portal Page, and a Service Portal Menu record (module Service Portal -> Menus) will be automatically created by the platform.
At this point, you can create your menu items/tabs. There are three types of visualisation supported at the moment: 'apps', 'list', and 'widgets'. Here below a sample Scripted List Menu Item for each type.

Type 'apps':

``` javascript
var t = data;

/*** options ***/
t.table = 'm2m_sp_status_subscription';
t.filter = 'sys_userDYNAMIC90d1921e5f510100a9ad2572f2b477fe^cmdb_ci_service.service_classification=Business Service^ORDERBYcmdb_ci_service.name';
t.type = 'apps';
t.limit = 11;
t.attributes = 'cmdb_ci_service.name,cmdb_ci_service.x_pisn_sp_launchp_logo,cmdb_ci_service.sys_id';
t.page_id = 'form';
t.page_table = 'cmdb_ci_service';
t.page_sys_id = 'cmdb_ci_service.sys_id';

t.record_watchers = [];
t.record_watchers.push({'table':t.table,'filter':t.filter});
```

Type 'list':

``` javascript
var t = data;

/* options */
t.table = 'task';
t.filter = 'active=true^sys_class_name=incident^opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORDERBYDESCsys_updated_on';
t.type = 'list';
t.filter_count = 'sys_class_name=incident^opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^state=1^ORstate=2^ORstate=3';

t.record_watchers = [];
t.record_watchers.push({'table':t.table,'filter':t.filter});
```


Type 'widget':

``` javascript
var t = data;
var spLaunchpadAPI = new x_pisn_sp_launchp.SpLaunchpadAPI();

/* options */
t.table = 'sys_user';
t.filter = 'active=true^company='+gs.getUser().getCompanyID();
t.type = 'widget';
t.data = {};
t.data.count = spLaunchpadAPI.getCount(t.table, t.filter);
t.widget_id = 'widget-data-table';
t.widget_options = {
  table: t.table,
  filter: t.filter,
  view: 'sp',
  o: 'name',
  d: 'asc',
  fields: 'first_name,last_name,email,title',
  window_size: 3,
  hide_header: true,
  sp_page: 'user_profile'
}

t.record_watchers = [];
t.record_watchers.push({'table':t.table,'filter':t.filter});
```


## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

``` sass
$x-pisn-sp-launchp: lighten($gray-base, 85%);
$x-pisn-sp-launchp-active: $brand-primary;
$x-pisn-sp-launchp-text: $x-pisn-sp-launchp !default;
$x-pisn-sp-launchp-badge: $x-pisn-sp-launchp !default;
$x-pisn-sp-launchp-badge-bg: white !default;
$x-pisn-sp-launchp-badge-b: $x-pisn-sp-launchp !default;
$x-pisn-sp-launchp-border: $x-pisn-sp-launchp-text-active !default;
$x-pisn-sp-launchp-text-active: $x-pisn-sp-launchp-active !default;
$x-pisn-sp-launchp-badge-active: white !default;
$x-pisn-sp-launchp-badge-bg-active: $x-pisn-sp-launchp-active !default;
$x-pisn-sp-launchp-badge-b-active: $x-pisn-sp-launchp-active !default;
```
