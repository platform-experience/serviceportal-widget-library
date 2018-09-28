# My JIRA Issues

## Description

This is a simple JIRA integration, widget can be issued to list of issues assigned to you/created by you in JIRA.

## Screenshot

![My JIRA Issues](../images/pe-my-jira-issues.png "My JIRA Issues")

## Additional Information/Notes

The integration assumes you have an Atlassian account id. Example: https://[your-account-id].atlassian.net

## Installation

Download and install update set **[pe-my-jira-issues.u-update-set.xml](https://github.com/platform-experience/serviceportal-widget-library/blob/master/pe-my-jira-issues/pe-my-jira-issues.u-update-set.xml)**

After installation, the widget can be accessed via the `Service Portal > Widgets` section for use and customization.

## Configuration

### Widget Option Schema

| Option | Description | Default Value |
| :--- | :--- | :--- |
| `Limit` | Number of items you want to show on initial load of the widget. The remaining list can be loaded by clicking on Show more. | 5 |
| `Title` | Title for the widget. | |
| `Issues` | Is a choice list, here you choose if you want to pull Issues assigned to you or created by you. | |

![My JIRA Issues options](../images/pe-my-jira-issues-options.png "My JIRA Issues options")

## Platform Dependencies

> None

## Sample Data and Data Structures

> None

## API Dependencies

System Property:

> AtlassianId : Put your Atlassian account id here

![My JIRA Issues Basic Auth Admin](../images/pe-my-jira-issues-sys-property.png "My JIRA Issues Basic Auth Admin")

Basic Auth:

> For the REST API to work, please put in your Atlassian admin username/password for JIRA Admin basic auth profile.

![My JIRA Issues Basic Auth Admin](../images/pe-my-jira-issues-basicauth.png "My JIRA Issues Basic Auth Admin")

## CSS/SASS Variables

> None