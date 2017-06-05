## Synopsis: Timeline Widget Variation Used In Employee Experience

![alt text](../../images/pe-timeline-emp-exp.png "Timeline Widget")

This widget can be used to implement a timeline widget. A variation of the pe-timeline, used in Consumerize the Employee Experience.

## Installation

Installation is very simple, you can just download the update set "pe-timeline-emp-exp.u-update-set.xml" and install it on your instance. Then the widget is available for you to drag and drop on your page. This widget is driven by the data injected into it. The data is injected using "timelineService".

```javascript
var timelineData = {
  show: 2,
  header: {
    text: 'Suzy Ham',
    color: '#a7a7a7',
    remaining: 2,
    userPic: 'eb16d7c713453a007e94fc5ed144b055.iix'
  },
  timelineArray: [{
    state: 'good',
    title: 'Confirm return'
  }, {
    state: 'good',
    title: 'Sign LOA Agreement',
    signature: true
  }, {
    state: 'attention',
    title: 'Reactivate Badge',
    attenText: 'Escalated',
    attenSubText: 'Reactivate badge on 12/8',
    dept: 'IT',
    contact: 'Bill Woods'
  }]
};
```

The key "show" and its value decide how many timeline events to be shown in the widget, currently its set to 2, so only 2 events are shown; to view more you need to click on the "view more" button. "timelineArray" defines the number of timeline events. We have 3 events.

We provide an option to load data easily and to change the appearance of the widget.

**"Show Left Descriptions"** This is for displaying text on the left for each element in the timeline. This is set to false by default.

## Sass Variables

We provide one Sass variable to control the color of the statistics shown in the timeline (both text and icon):

`$pe-timeline-items-color: #ff6f00 !default;`

You can override these variables at portal level using the **themes**.
