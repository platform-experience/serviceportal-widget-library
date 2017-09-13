[![Build Status](https://travis-ci.org/platform-experience/serviceportal-widget-library.svg?branch=master)](https://travis-ci.org/platform-experience/serviceportal-widget-library)

# Service Portal: Widget Library

This a guide to be followed for widgetizing. Each section below is something we need to consider while widgetizing.

## Widget Name

All widget names should start with the prefix **PE**, this will make searching for widgets easy.

## Widget ID Naming

Widgets and Page IDs need to be unique in an instance, we need to take care while naming IDs to avoid collisions when Widget or Page is being loaded into instance or while committing an Update Set, or when an Upgrade or Plugin is applied. Thus we need to keep these points in mind.

1. Every Widget must have an ID
1. IDs should be hyphenated alphanumeric strings (i.e. no spaces, no special characters)
1. The ID of all Widgets developed/created for widget library should start with prefix **pe-**

Ex: **pe-approval-card**

## Update Set

**Please make sure you capture widget related updates correctly.** update set should start with prefix **pe-** and end with **update-set**. For example ***pe-approval-card-update-set.u-update-set.xml**. Make sure you don't capture widget instance related records/ grid related records like row, column etc. Keep the update set clean and capture on widget related stuff.

## SASS Variables

All SASS variables created for this project will start with prefix **$pe-**. You can add the variables at the Theme level as well as at the widget level.
While adding the variable at widget level make sure you use **!default** keyword. This will let us override these variables at the theme level. This will make the widget self-contained. We can easily drag and drop them on to any page.

For example at Theme level:

`$pe-brand-success: #5cb85c;`

For example at Widget level:

`$pe-brand-success: #5cb85c !default;`

## Includes (JS, CSS, etc.)

Even the includes with standard FWs should be renamed with prefix **pe-**. This to avoid duplication errors during the import of the update set in existing instances.

For instance:

`highcharts-ng`

should be renamed to:

`pe-highcharts-ng`

## Folder and File Naming Convention

1. Create a folder with widget name for ex: **pe-people-card**

2. Create another folder called **widget** inside the above folder.

3. Widget record fields should go inside **widget** folder. Fields must be named as follows
    * HTML->               `<widget-name>.u-body-html-template.html`
    * Client Controller->  `<widget-name>.u-client-script.js`
    * Server Script->      `<widget-name>.u-server-script.js`
    * CSS->                `<widget-name>.u-css.scss`

4. UI Scripts should go inside a folder called **ui-script** , all ui scripts should be named as follows
    * `<widget-name>-<purpose>.u-client-script.js` .. some purspose examples can be **service**, **factory**, **module**

    > If its a js library file, which users dont need to edit for ex: "highcart-ng", emit this **u-client-script** part in name. This will make sure we dont pull the huge library files from SNOW.

5. Style Sheets should go inside a folder called **style-sheet** , all stylesheets should be named as follows.
    * `<widget-name>-<purpose>.u-css.scss`

    > If its a css library file, which users dont need to edit for ex: "animates.css", emit this **u-css** part in name. This will make sure we dont pull the huge library files from SNOW.

6. Angular Providers should go inside a folder called **angular-provider** , all providers should be named as follows
    * `<widget-name>-<purpose>.u-client-script.js`

7. Angular Templates should go inside a folder called **angular-template** , all ui scripts should be named as follows
    * `<widget-name>-<template-id>.u-body-html-template.html`

8. Script Includes should go inside a folder called **script-include** , all these scripts should be named as follows
    * `<widget-name>-<purpose>.u-client-script.js`

9. Update Sets must be named as follows
    * `<widget_name>.u-update-set.xml`

## Style Guide

All contributors to the widget library should strive to follow the [Service Portal: Angular Style Guide](https://github.com/platform-experience/serviceportal-best-practice) and adhere to the EditorConfig rules.

## Internationalization

All Widgets should support [Internationalization](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/build/service-portal/concept/c_WidgetLocalization.html), so that they can be translated into other languages for non-English speaking markets.