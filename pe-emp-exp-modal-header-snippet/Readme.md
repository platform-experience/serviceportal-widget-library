## Synopsis: Employee Experience Modal Snippet

![alt text](../images/pe-emp-exp-modal-header-snippet.png "Modal Snippet")
![alt text](../images/pe-emp-exp-modal-header-snippet.png "Modal")



This is the snippet for signature modal in employee experience.

## Installation

Installation is very simple, you can just download the update set "pe-emp-exp-modal-header-snippet" and install it on your instance. Then the widget is available for you to drag and drop on your page. This widget is driven by the data injected into it. The data is injected using "timelineService".

```javascript
        //use moment js to get yesterday's date
        c.yesterday = moment(new Date()).subtract(1, 'days').date();
        c.yestedaymonth = moment(new Date()).subtract(1, 'days').format("MMM");

        c.documentUser = "Suzy Ham";
        c.title = "TAX DOCUMENT";
        c.sub_title = "RELOCATION";

        spUtil.get('pe-scratch-pad', {
         }).then(function(response) {
             c.data.embedded_widget = response;
         });
```

As you can see above this snippet uses "pe-scratch-pad" widget for signature pad. this widget is already included in the snippet update set.

***

We provide four SASS variables to control the color of the statistics shown in the timeline (both text and icon):

`$pe-blue-color: #268cf8 !default;`

You can override these variables at portal level using the **themes**.
