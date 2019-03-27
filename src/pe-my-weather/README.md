# My Weather

## Description

> Enhanced weather widget that follows you. Gets your current location using browser when given access. If not, falls back to the user location in sys_user table.

## Screenshot

![My Weather](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-my-weather/images/pe-my-weather.png)

## Additional Information/Notes

- This has a simple integration to [https://openweathermap.org/](https://openweathermap.org/).  
- When the widget loads, your browser will ask your permission to access current location. 



![browser_location](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-my-weather/images/browser_location.png)

- Once you grant access, widget will show weather info using your browser location.
- If you choose not to grant access, the widget will use location in sys_user table to fetch the weather

## Installation

Download and install update set **[pe-my-weather.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-my-weather/pe-my-weather.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

- I have included a demo API key for use as part of the update set. It is advised to sign up and get your own API key from here [https://openweathermap.org/api'](https://openweathermap.org/api)
- Once you have your own API key, you can switch out the demo key by changing the System property called **openweathermap.apikey**


![openweathermap.apikey](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-my-weather/images/sys_property.png)

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
