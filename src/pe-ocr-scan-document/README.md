# OCR Scan Document

## Description

A custom widget that uses [OCR](https://ocr.space) to create a case in ServiceNow with the text obtained from a document that is scanned by a mobile phone. 

## Screenshot

![OCR Scan Document](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-ocr-scan-document/images/pe-ocr-scan-document.png)

## Additional Information/Notes

This widget utilizes [OCR](https://ocr.space/ocrapi) technology to take text from an image and convert it to data that can be used in ServiceNow. You will need to add your own API key into the widget for it to work properly.

* Download the step by step guide **[pe-ocr-scan-tutorial.pdf](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-ocr-scan-document/docs/pe-ocr-scan-tutorial.pdf)**

* Print this document so you can scan once you have configure the widget **[pe-ocr-scan-document.pdf](https://raw.githubusercontent.com/platform-experience/serviceportal-widget-library/master/src/pe-ocr-scan-document/docs/pe-ocr-scan-document.pdf)**

## Installation

Download and install update set **[pe-ocr-scan-document.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/src/pe-ocr-scan-document/pe-ocr-scan-document.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

* SN Product Documentation - ['Load a customization from a single XML file'](https://docs.servicenow.com/bundle/kingston-application-development/page/build/system-update-sets/task/t_SaveAnUpdateSetAsAnXMLFile.html)

## Configuration

See Additional Information/Notes 

## Platform Dependencies

### SN System Tables

Case - sn_customerservice_case is need for this widget function properly.

### UI Dependencies

> None

## CSS/SASS Variables

_CSS/SASS variables are given default values that can be overridden with theming or portal-level CSS._

> None
