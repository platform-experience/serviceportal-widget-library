# Typeahead Search (Collapsing) - For Header Widgets

## Description

The Typeahead Search widget is intended to be used within the Header widget for a portal. However, it is not coded for exclusively within a Header.  The widget can be used anywhere you would like to have a Typeahead Search that collapses into just the Search icon when not being used.

## Screenshots
### Expanded
![Expanded](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-nav-typeahead-search-collapsed/images/default.png)
### Collapsed
![Collapsed](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-nav-typeahead-search-collapsed/images/collapsed.png)

## Additional Information/Notes

Within the Header widget, the following HTML notation is to be used.

Find the HTML DIV that identifies the navbar region that encapsulates the menu and user avatar.
The DIV opening string may look something like this:
```
<div sp-navbar-toggle="" class="collapse navbar-collapse navbar-right" id="sp-nav-bar">
```

You will then want to add the following HTML block within the DIV at the location where you will want the Search to be located.
It is recommended that you add it **immediately** after the DIV's opening statement. This should put the widget as the first item (at the far left of the menu choices) in the list of menu items.
```
  <!-- search -->
  <ul ng-if="user.logged_in" class="nav navbar-nav" role="menubar">
    <li role="presentation" class='menuitem'><sp-widget widget="data.typeahead" /></li>
  </ul>
```

There are no specific CSS or Client script notations that need to be added.

However, the widget does need to be brought into existence by adding the following line to the Server script block.
It can be placed anywhere, however; it is recommended to be added as the last line before the function closing brace.

```
data.typeahead = $sp.getWidget('typeahead-search-for-header');
```

Additionally, if you would like to configure the search with unique icon, change the placeholder text, or other Option Schema options then add the following JSON Object string to the $sp.getWidget() statement.
```
data.typeahead = $sp.getWidget('typeahead-search-for-header',{"refresh_page_on_search_submission":false, "title":"How may we help you?", "glyph":"star", "size":"sm", "limit":"5","contextual_search_sources":"c6170ae86721220023c82e08f585efe6,c96eb1686721220023c82e08f585efff"});
```
<br/>

---
## Installation
Download and install update set **[pe-nav-typeahead-search-collapsed.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-nav-typeahead-search-collapsed/pe-nav-typeahead-search-collapsed.u-update-set.xml)** <br/><br/>
After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.<br/>
* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

---
## Configuration
Widget Option Schema parameters:

### Presentation
**title** - Change the placeholder text inside the input field that greets the user when the control is displayed/opened - Default: Search <br/>
**glyph** - FontAwesome (v4.0.7) reference of a glyph to show as the Search icon - Default: search  **NOTE:** it is just the portion after the 'fa-' <br/>
**size** - Quick way to adjust the size of the widget control.  Valid values are 'sm' or 'lrg'<br/>

### Behavior
**limit** - The limit of results to show in the search dropdown list. Default: 5<br/>
**contextual_search_sources** - Restrict the search results to specific Service Catalogs or Knowledge Bases. **IF NOT** configured then the search will use the Search Sources associated with the Portal configuration.  Use the Sys_ID for the respective Service Catalog or Knowledge Base. e.g. of valid values: c6170ae86721220023c82e08f585efe6,c96eb1686721220023c82e08f585efff<br/>
**refresh_page_on_search_submission** - Typically not necessary, but this will force the page to reload after the search source has been activated.<br/>

---
## API Dependencies
<i>Dependencies are included and configured as part of the provided Update Set.</i>
> None

---
## CSS/SASS Variables
Following variables can be set used to change the presentation of the widget:

$search-text-color: #f4f4f4  !default; <br/>
$search-placeholder-color: $text-muted !default;<br/>

$search-bg: rgba(0, 0, 0, .25) !default;<br/>
$search-height: 40px !default;<br/>
$search-font-size: 14px !default;<br/>
$search-showing-width: 250px !default;<br/>
$search-dropdown-border-radius: 4px !default;<br/>
