## Synopsis: End User Login Widget

![](../../images/pe-enduser-login.png)

This can be used to quickly craft a login widget.

## Installation

Installation is very simple, you can just download the update set **pe-enduser-login.u-update-set.xml** and install it on your instance. Then the widget is available for you to drag and drop on your page.

## Configuration

We provide 3 options to configure the widget.

1. **"table"** This is for changing the table that the default user is pulled from. It is defaulted to "sys_user"

1. **"email_address_field"** This is the field that we will pull the email address from for the login. It is defaulted to "email"

1. **"encoded_query"** This is for specifying a user, it will allow you to set the query for any parameters. The default value is "email!=NULL^GOTOnameLIKESystem Administrator"