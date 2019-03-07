# Rest Typeahead Search

## Description

Typeahead Search lets the user searching with suggestions, through REST, and finally to select and send a record through the event "pe-typeahead-selection".

## Screenshots

![Rest Typeahead Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-rest-typeahead-search/images/pe-rest-typeahead-search-01.png)

![Rest Typeahead Search](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-rest-typeahead-search/images/pe-rest-typeahead-search-02.png)

## Additional Information/Notes

The Typeahead Search widget provides suggestions for users as they type in the search field.

### Main features

* Providing suggestions through the autocomplete search library [Twitter Typeahead v1.2.0](https://github.com/corejavascript/typeahead.js)

* Obtaining data through REST. It can be connected also to a Table API defined in a different ServiceNow instance if the relative option _REST Instance_ is used, and a [CORS rule](https://docs.servicenow.com/bundle/london-application-development/page/integrate/inbound-rest/concept/c_CORSSupport.html) defined in the target instance.

* Broadcasting on record selection (event name: "pe-typeahead-selection"). Sample code for receiving the selected record (json object) in any widgets used in the Portal application:

```javascript
$rootScope.$on('pe-typeahead-selection', function(event, obj) {
  /* code */
});
```

### Presentation

* Bootstrap Color: select Default to use custom SASS variables in the Theme (complete list at the top of the widget CSS section).

* Bootstrap Size: this will define the padding around the Search text field (md, lg, etc.).

* Placeholder: the text hint in the empty input field.

* Overlay Effect: if enabled, it will apply a CSS effect (class pe-rest-typeahead-search__dim) to help the user in focusing more on the results.

## Installation

Download and install update set **[pe-rest-typeahead-search.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-rest-typeahead-search/pe-rest-typeahead-search.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### Widget Option Schema

| Option | Description | Required Field |
| :--- | :--- | :--- |
| `Table` | Table containing the records to query. | true |
| `Filter` | Additional filter. |  |
| `Display Field` | The column/attribute to show in the result list. | true |
| `Query Field` | The column/attribute used by Twitter Typeahead to provide the suggestions. | true |
| `Order By` | The result sorting. |  |
| `Order Direction` | The result sorting direction. |  |
| `Limit Result` | The maximum number of records to obtain and display. | true |
| `REST Instance` | If the REST Table API is in a different instance. |  |
| `REST Username` | If REST instance is used, provide the credentials. |  |
| `REST Password` | If REST instance is used, provide the credentials. |  |

## Platform Dependencies

### API Dependencies

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
