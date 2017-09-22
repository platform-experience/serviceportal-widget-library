[![Build Status](https://travis-ci.org/platform-experience/serviceportal-widget-library.svg?branch=master)](https://travis-ci.org/platform-experience/serviceportal-widget-library)

# Service Portal: Widget Library

This a guide to be followed for *widgetizing*. Each section below is something we need to consider while crafting widgets.

## Table of Contents

  1. [Widget Name](#widget-name)
  1. [Widget Id](#widget-id)
  1. [Update Set](#update-set)
  1. [Sass Variables](#sass-variables)
  1. [Includes](#includes)
  1. [Folder and File Naming Conventions](#folder-and-file-naming-conventions)
  1. [Folder Structure](#folder-structure)
  1. [Style Guide](#style-guide)
  1. [Internationalization](#internationalization)

## Widget Name

All widget names should start with the prefix **PE**. This will make searching for widgets easy and provide a unique namespace for our custom widgets.

**[Back to top](#table-of-contents)**

## Widget Id

Widget and page ids need to be unique in an instance. We need to be careful when naming the id to avoid collisions when: widget or page is being loaded into an instance, while committing an update set or when an upgrade or plugin is applied.

Thus we need to keep these points in mind.

1. Every widget must have an id
1. Ids should be hyphenated alphanumeric strings (i.e. no spaces, no special characters)
1. Widget ids should start with the prefix **pe-**

Example: pe-approval-card

**[Back to top](#table-of-contents)**

## Update Set

Please make sure you capture widget related updates correctly. Update sets should start with prefix **pe-** and end with **update-set**. For example, **pe-approval-card-update-set.u-update-set.xml**. Make sure you don't capture widget instance related records or grid related records like: row, column etc. Keep the update set clean and capture only widget related items.

**[Back to top](#table-of-contents)**

## Sass Variables

All Sass variables created for this project will start with prefix **$pe-**. You can add the variables at the theme level as well as the widget level.
While adding the variable at the widget level, make sure you use the **!default** keyword. This will let us override these variables at the theme level and make the widget self-contained. We can easily drag and drop them on to any page.

For example, at theme level:

```scss
$pe-brand-success: #5cb85c;
```

And at the widget level:

```scss
$pe-brand-success: #5cb85c !default;
```

**[Back to top](#table-of-contents)**

## Includes

Even the includes with standard FWs should be renamed with the prefix **pe-**. This will help to avoid duplication errors during the update set import on existing instances.

For instance `highcharts-ng` should be renamed to `pe-highcharts-ng`.

**[Back to top](#table-of-contents)**

## Folder and File Naming Conventions

### Widgets

Widget record fields should go inside the **widget** folder. Fields must be named as follows.

```
* HTML               =>  <widget-name>.u-body-html-template.html
* Client Controller  =>  <widget-name>.u-client-script.js
* Server Script      =>  <widget-name>.u-server-script.js
* CSS                =>  <widget-name>.u-css.scss
* Option Schema      =>  <widget-name>.u-option-schema.json
```

### UI Scripts

UI scripts should go inside a folder called **ui-script**, all UI Scripts should be named as follows.

```
<widget-name>-<purpose>.u-client-script.js
```

Some examples of purpose would be: service, factory, module.

>If it's a JS library file, which users don't need to edit for example: "highcart-ng", emit this **u-client-script** part in the name. This will make sure we don't pull huge library files from ServiceNow.

### Style Sheets

Style sheets should go inside a folder called **style-sheet**, all style sheets should be named as follows.

```
<widget-name>-<purpose>.u-css.scss
```

>If it's a CSS library file, which users don't need to edit for example: animate.css, emit this **u-css** part in the name. This will make sure we don't pull huge library files from ServiceNow.

### Angular Providers

Angular providers should go inside a folder called **angular-provider**, all providers should be named as follows.

```
<widget-name>-<purpose>.u-client-script.js
```

### Angular Templates

Angular templates should go inside a folder called **angular-template**, all UI Scripts should be named as follows.

```
<widget-name>-<template-id>.u-body-html-template.html
```

### Script Includes

Script includes should go inside a folder called **script-include**, all these scripts should be named as follows.

```
<widget-name>-<purpose>.u-client-script.js
```

### Update Sets

Update sets must be named as follows.

```
<widget_name>.u-update-set.xml
```

### Unit Tests

Unit tests should go inside a test folder and be named as follows.

```
<widget-name>.<type>.spec.js
```

**[Back to top](#table-of-contents)**

## Folder Structure

```
pe-timeline
│
├──angular-provider
│  └──pe-timeline.provider.u-client-script.js
│
├──angular-template
│  └──pe-timeline.svg.u-body-html-template.html
│
├──script-include
│  └──pe-timeline.helper.u-server-script.js
│
├──style-sheet
│  └──pe-timeline-animate.css
│
├──test
│  └──pe-timeline.client.spec.js
│  └──pe-timeline.service.spec.js
│
├──ui-script
│  └──pe-events.service.u-client-script.js
│  └──pe-events.module.u-client-script.js
│
├──widget
│  └──pe-timeline.u-body-html-template.html
│  └──pe-timeline.u-client-script.js
│  └──pe-timeline.u-css.scss
│  └──pe-timeline.u-option-schema.json
│  └──pe-timeline.u-server-script.js
│
├──pe-timeline.u-update-set.xml
└──README.md
```

**[Back to top](#table-of-contents)**

## Style Guide

All contributors to the widget library should strive to follow the [Service Portal: Angular Style Guide](https://github.com/platform-experience/serviceportal-best-practice) and adhere to the [EditorConfig](.editorconfig) and [ESLint](.eslintrc) rules.

**[Back to top](#table-of-contents)**

## Internationalization

All widgets should support [Internationalization](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/build/service-portal/concept/c_WidgetLocalization.html), so that they can be translated into other languages for non-English speaking markets.

**[Back to top](#table-of-contents)**