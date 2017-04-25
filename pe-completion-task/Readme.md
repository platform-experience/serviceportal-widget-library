## Synopsis: Completion Task

![Completion Task Widget](../images/pe-completion-task-1.png "Completion Task widget")

This widget shows an individual task, the status of the task, and an optional message related to the task. When used multiple times on a page, it becomes a list of tasks, each of which can be given its own hyperlink to take you to another page.

***

## Installation

Simply download the **pe-completion-task.u-update-set.xml** update set and install it on your instance. Once installed, the widget will be available on your instance to drag and drop onto any page via the Service Portal Page Designer.

The widget uses it's own custom widget instance table, `u_sp_instance_completion_task`. Whether a task is completed is controlled by the evaluation of the "Validation script" (true/false). The message shown is also controlled by the return value of a script, in this case the "Warning message script". All widget options are configurable via the regular instance options editor. See screen recording below:

![Completion Task Widget](../images/pe-completion-task-2.gif "Completion Task widget")

***

There are four SASS variables which control the styling of the widget.

`$pe-ct-heading: #117fc1 !default;`

`$pe-ct-warning: #d35400 !default;`

`$pe-ct-arrow: #117fc1 !default;`

`$pe-ct-completed: green !default;`
