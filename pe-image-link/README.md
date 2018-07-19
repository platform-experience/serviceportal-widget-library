# Image Link

## Description

The behaviour of this widget is identical to that of the out of box "Icon Link" widget, only that it shows an image, custom text, and has a hover effect.

## Screenshots
![](../images/pe-image-link.jpg)

## Installation
Download and install update set **[pe-image-link.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-image-link/pe-image-link.u-update-set.xml)**.

For instructions on how to do this see the [ServiceNow Product Documentation]((https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)).

After applying the update set the widget can then be accessed via the `Service Portal > Widgets` section for use and customization.


## Configuration

- **Type:** The type of link, e.g. "KB Article". Will reveal another option to select the relevant record (e.g. an actual KB Article to link to)
- **Page:** The page that the user should be taken to after clicking the link
- **Image URL:** The URL of the image to use as the background of the box.
- **Image Position:** The position of the background image. See MDN documentation on [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) for values.
- **Title:** The text to show in the box.
- **Order:** The order the boxes will be shown in, if there are multiple widgets in the same container.


## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

| Variable Name          | Description                                           | Default Value                                                                  |
|------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------|
| `$peil-color`          | The colour of the text                                | `white`                                                                          |
| `$peil-border-radius`  | The rounding of the box                               | `4px`                                                                           |
| `$peil-gradient`       | The subtle black shading that appears over the image  | `linear-gradient(0deg, rgba(0,0,0,0.71) 0%, rgba(0,0,0,0) 50%)`               |
| `$peil-gradient-hover` | Same as above, but on hover (default will get darker) | `linear-gradient(0deg, rgba(0,0,0,2) 0%,rgba(0,0,0,0.3) 25%, rgba(0,0,0,0) 80%)` |
| `$peil-shadow`         | The shadow under the box                              | `0 0 6px 0 rgba(0, 0, 0, .06)`                                                   |
| `$peil-height`         | The height of the box                                 | `120px  `                                                                        |
| `$peil-max-width`      | The maximum width that the box will expand to         |` auto `                                                                          |