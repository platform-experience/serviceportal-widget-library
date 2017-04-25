## Synopsis: Training widget (Financial Onboarding Experience)

![Training widget](../images/pe-foexp-training.png "Training widget")

This widget can be used to show training courses allocated to the current user for a particular category of training courses. The user can enroll in, and un-enroll from those courses. Furthermore, they can see what courses they have completed in the category and which are remaining.

***

## Installation

Simply download the update set **pe-foexp-training.u-update-set.xml** and install it on your instance. The widget will be available to be dragged onto your page.

You can either use the "Category" option to select a category to always show in this widget, or pass the `category` parameter in via the URL to set which category the widget should show.

This widget makes use of 4 new custom tables. You will need to populate data into these tables for the widget to work. See the customsation section for more information about this.

***

## Customisation

### Tables

This widget uses 4 new custom tables. All are accessible under the new "Training" module.

#### Categories
This is a group of training courses which are all displayed in the widget together.

These are stored in the `u_pe_training_category` table. 

#### Courses
These are stored in the `u_pe_training_course` table.

#### Prerequisites
This allows you to link courses together and says that, for example, "Training Course A" must be completed before "Training Course B" is started.

These are stored in the `u_pe_training_prerequisites` table. 

#### Assignments
The current user must be assigned a course for it to show up in the widget.

These are stored in the `u_pe_training_assignments_list` table.

### Colours

`$page-bg: #f5f5f5 !default;`

`$primary-color: #117fc1 !default;`

`$primary-color-darker: #0065d3 !default;`

`$secondary-color: #2980b9 !default;`

`$border-color: #1aa5be !default;`