## Synopsis

This a guide to be followed for widgetizing. Each section below is something we need to consider while widgetizing.

***

## Widgets

**Widgets available now:**

* [Approval Card](https://github.com/platform-experience/serviceportal-widget-library/tree/master/Approve%20Card/pe-approval-card)

* [Feedback Card](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-feedback-card)

* [People Info](https://github.com/platform-experience/serviceportal-widget-library/tree/master/People%20Card/pe-people-info)

* [Scratch Pad](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-scratch-pad)

* [Timeline](https://github.com/platform-experience/serviceportal-widget-library/tree/master/Timeline/pe-timeline)

* [Tabs Selector](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-tabs-selector)

* [Donut Chart](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-donut-chart)

* [Inbox](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-inbox)

* [Emp Exp Timeline](https://github.com/platform-experience/serviceportal-widget-library/tree/master/Timeline/pe-timeline-emp-exp)

* [Horizontal Stacked Bar](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-horizontal-stacked-bar)

* [Approve Reject Card](https://github.com/platform-experience/serviceportal-widget-library/tree/master/Approve%20Card/pe-approve-reject-card)

* [Approve Reject Inbox](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-approve-reject-inbox)

**Snippets available now:**

* [Status Card Snippet](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-status-card-snippet)

* [Overview Card Snippet](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-overview-card-snippet)

* [Employee Experience Signature Modal Snippet](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-emp-exp-signature-modal-snippet)

* [Employee Experience Services List Snippet](https://github.com/platform-experience/serviceportal-widget-library/tree/master/pe-emp-exp-services-list-snippet)


***

## Update Set

**Please make sure you capture widget related updates correctly.** update set should start with prefix **pe-** and end with **update-set**. For example ***pe-approval-card-update-set.xml**. Make sure you don't capture widget instance related records/ grid related records like row, column etc. Keep the update set clean and capture on widget related stuff.

***

## Widget Name

All widget name should start prefix **PE**, this will help in searching widgets easy.

***

## Widget ID Naming

Widgets and Pages IDs need to be unique in an instance, we need to take care while naming ID's to avoid collisions when Widget or Page is being loaded into instance or while committing an Update Set, or when an Upgrade or Plugin is applied. Thus we need to keep these points in mind.

1. Every Widget must have an ID
2. IDs should be hyphenated alphanumeric strings (i.e. no spaces, no special characters)
3. The ID of all Widgets developed/created for widget library should start with prefix **pe-**

Ex: **pe-approval-card**

***

## SASS Variables

All SASS variables created for this project will start with prefix **$pe-**. You can add the variables at the Theme level as well as at the widget level.
While adding the variable at widget level make sure you use **!default** keyword. This will let us override these variables at the theme level. This will make the widget self-contained. We can easily drag and drop them on to any page.

For Ex at Theme level:

`$pe-brand-success: #5cb85c;`

For Ex at Widget level:

`$pe-brand-success: #5cb85c !default;`

***

## List of SASS variables defined so far

`$pe-brand-primary:         #337ab7;`

`$pe-brand-success:         #5cb85c;`

`$pe-brand-info:            #5bc0de;`

`$pe-brand-warning:         #f0ad4e;`

`$pe-brand-danger:          #d9534f;`

`$pe-brand-text-color-primary: 	#a8abaf;`

`$pe-brand-text-color-secondary: #fff;`

`$pe-brand-text-size-small: 12px;`

`$pe-brand-text-size-medium: 18px;`

`$pe-brand-text-size-big: 24px;`

`$pe-brand-text-size-normal: 16px;`

`$pe-timeline-items-color: #ff6f00;`


**plan to add following variables:**

`$pe-brand-secondary`

`$pe-icons-color`


*etc.*

## Includes (JS, CSS, etc.)

Even the includes with standard FWs should be renamed with prefix **pe-**. This to avoid duplication errors during the import of the update set in existing instances.

For instance:

`highcharts-ng`

should be renamed to:

`pe-highcharts-ng`