// Defines the support queue ID that will be linked to by the Live Chat link in header
data.connect_support_queue_id = $sp.getValue('sp_chat_queue');
data.login_page = $sp.getValue('login_page');
data.profileBtnMsg = gs.getMessage("User options");
var menu = $sp.getValue("sp_rectangle_menu");
data.menu = $sp.getWidgetFromInstance(menu);
if (data.menu && data.menu.data) {
	data.menu.data.replace = true;
	// Hide login if menu already has link to login
	data.hasLogin = false;
	if (data.menu.data.menu.items) {
		for(var i in data.menu.data.menu.items) {
			var item = data.menu.data.menu.items[i];
			if (item.type == 'page' && item.sp_page == data.login_page)
				data.hasLogin = true;
		}
	}
}

data.loginWidget = $sp.getWidgetFromInstance('login-modal');