# Icon Link Watson Translator

## Description

An extension of the [Icon Link](https://docs.servicenow.com/bundle/madrid-servicenow-platform/page/build/service-portal/concept/icon-link-widget.html) out-of-box widget that uses [IBM Watson](https://www.ibm.com/watson) to perform language translation.

## Screenshots

### Source Language: English

![Source Language: English](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-icon-link-watson-translator/images/source-language-english.png)

### Target Language: Korean

![Target Language: Korean](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-icon-link-watson-translator/images/target-language-korean.png)

## Additional Information/Notes

This widget utilizes the IBM Watson [Language Translator](https://www.ibm.com/watson/services/language-translator/) service that uses deep learning to programmatically translate text from one language to another. This Watson service supports the ability to identify up to 62 languages. Simply choose the target language in the widget options to perform translations.

## Installation

Download and install update set **[pe-icon-link-watson-translator.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-icon-link-watson-translator/pe-icon-link-watson-translator.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

- SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/madrid-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

### IBM Watson Setup

Sign up for an [IBM Cloud account](https://dataplatform.cloud.ibm.com/registration/stepone) or simply log in. After that, create a service for the [Language Translator](https://www.ibm.com/watson/services/language-translator/). Then get the API Key that will be needed for authentication in your ServiceNow instance. A basic auth profile will need to be added for the Watson Language Translator REST Message provided in the update set; with _apikey_ as the username and the actual API Key as the password.

### Widget Option Schema

See the [Icon Link](https://docs.servicenow.com/bundle/madrid-servicenow-platform/page/build/service-portal/concept/icon-link-widget.html) widget for more information on instance options. This extension provides a new field for language translation: `Translate to`.

## Platform Dependencies

### SN System Tables

> None

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
