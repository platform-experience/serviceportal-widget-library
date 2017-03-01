## Synopsis

This a guide to be followed for widgetizing. Each section below is something we need to consider while widgetizing.

***

## Update Set

**Please make sure you capture widget related updates correctly.** update set should start with prefix **pe-** and end with **update-set**. For example ***pe-approval-card-update-set.xmml**. Make sure you dont capture widget instance related records/ grid related records like row, column etc. Keep the update set clean and capture on widget related stuff.

***

## Widget ID Naming

Widgets and Pages IDs need to be unique in an instance, we need to take care while naming ID's to aviod collisions when Widget or Page is being loaded into instance or while committing an Update Set, or when an Upgrade or Plugin is applied. Thus we need to keep these points in mind. 

1. Every Widget must have an ID
2. IDs should be hyphenated alphanumeric strings (i.e. no spaces, no special characters)
3. The ID of all Widgets developed/created for widget library should start with prefix **pe-**

Ex: **pe-approval-card**

***


## SASS Variables

All SASS vafiables created for this project will start with prefix **$pe-**. You can add the varaibles at the Theme level as well as at the widget level.
While adding the variable at widget level make sure you use **!default** keyword. This will let us overide these variables at the theme level. This will make the widget self-contained. We can easlity drag and drop them on to any page.

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

`$pe-brand-text-color: 		#fff;`

`$pe-brand-text-size-normal: 15px;`

`$pe-timeline-items-color: #ff6f00`

*plan to add following variables:*

`pe-brand-secondary`

`pe-text-title-color`

`pe-text-header-color`

`pe-icons-color`

`pe-header-font-size`

`pe-header-font-weight`

*etc.*
