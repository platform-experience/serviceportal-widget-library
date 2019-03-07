# Rest Typeahead Search

## Description

Typeahead Search lets the user searching with suggestions, through REST, and finally to select and send a record through the event "pe-typeahead-selection".

## Screenshots

![Rest Typeahead Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-rest-typeahead-search/images/pe-rest-typeahead-search-01.png)

![Rest Typeahead Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-rest-typeahead-search/images/pe-rest-typeahead-search-02.png)

## Additional Information/Notes

The Typeahead Search widget provides suggestions for users as they type in the search field.

Main features are:

* Providing suggestions through the autocomplete search library [Twitter Typeahead v1.2.0](https://github.com/corejavascript/typeahead.js)

* Obtaining data through REST. It can be connected also to a Table API defined in a different ServiceNow instance if the relative option _REST Instance_ is used, and a [CORS rule](https://docs.servicenow.com/bundle/london-application-development/page/integrate/inbound-rest/concept/c_CORSSupport.html) defined in the target instance.

* Broadcasting on record selection (event name: "pe-typeahead-selection"). Sample code for receiving the selected record (json object) in any widgets used in the Portal application:

```javascript
$rootScope.$on('pe-typeahead-selection', function(event, obj) {
  /* code */
});
```

## Installation

Download and install update set **[pe-rest-typeahead-search.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-rest-typeahead-search/pe-rest-typeahead-search.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

> None

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> typeahead.js v1.2.0

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

```scss
$pe-rest-typeahead-hover-color
$pe-rest-typeahead-hover-bg
$pe-rest-typeahead-menu-bg
$pe-rest-typeahead-border-color
$pe-rest-typeahead-border-radius
$pe-rest-typeahead-border
$pe-rest-typeahead-max-width
$pe-rest-typeahead-dim-opacity
```
