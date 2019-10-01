// Defines the support queue ID that will be linked to by the Live Chat link in header
data.url_suffix = $sp.getValue('url_suffix');  
if(data.url_suffix=="community"){
	data.iscommunity=true;
	data.show_signup=GlidePluginManager.isActive('com.sn_customer_communities');
	if(data.show_signup)
		data.login_label=gs.getMessage("Sign up/Login");
	else
		data.login_label=gs.getMessage("Login");
}
data.isMobile = gs.isMobile();
data.connect_support_queue_id = $sp.getValue('sp_chat_queue');
data.login_page = $sp.getValue('login_page');

var menu = $sp.getValue("sp_rectangle_menu");
data.menu = $sp.getWidgetFromInstance(menu);

// Load the Secondary Menu Widget
var qsConfig = $sp.getValue("quick_start_config");
var qsConfigJson = qsConfig ? JSON.parse(qsConfig)[0] : {};
var secondaryMenuInstance = qsConfigJson.secondaryMenu ? qsConfigJson.secondaryMenu.sys_id : '';
data.secondaryMenu = $sp.getWidgetFromInstance(secondaryMenuInstance);
data.isCommunityPortal = qsConfigJson.isCommunityPortal;
data.isCSPPortal = qsConfigJson.isCSPPortal;
data.isCSMPortal = qsConfigJson.isCSMPortal;

data.isVAActive = false;
data.queueType = "connect";
var liveAgent = new GlideRecord("sys_cs_live_agent_setup");
if (liveAgent.isValid()) {
	liveAgent.query();
	if (liveAgent.next()) {
	data.queueType = liveAgent.getValue("csm_fulfiller");
	}
}
data.isVAActive = GlidePluginManager.isActive('com.glide.cs.chatbot');

// changes data.live_agent_only to true to allow only live agent
data.live_agent_only = false;
if (!data.live_agent_only) {
	data.live_agent_only = !data.isVAActive;
}

data.useChatWidgetForCSM = false;
var chatW = new GlideRecord("sp_widget");
chatW.addQuery("id", "sn-va-sp-widget");
chatW.query();
if (chatW.next()){
	data.useChatWidgetForCSM = true;
	var contactUrl = "";
	var accountUrl = "";
	var cc = new GlideRecord('customer_contact');
	cc.addQuery("sys_id", gs.getUserID());
	cc.query();
	if (cc.next()) {
		contactUrl = "&sysparm_liveagent_interaction_contact=" + cc.getUniqueValue();
		accountUrl = "&sysparm_liveagent_interaction_account=" + cc.getValue("account");
	}
	var liveAgentUrl = data.live_agent_only ? "&sysparm_live_agent_only=true":"";
	var csmQueue;
	if (data.queueType == 'connect') {
		csmQueue = data.connect_support_queue_id;
	} 
		
	var portal = "";
	if(data.isCSPPortal == true){
		portal = "csp";
	} else{
		portal = "csm";
	}
	
	var va_parms = "sysparm_portal="+portal+"&sysparm_liveagent_application=csm&sysparm_liveagent_queue="+csmQueue+contactUrl+accountUrl+liveAgentUrl;
	
	data.va_chat = $sp.getWidget('sn-va-sp-widget',{
		va_url_params:va_parms
	});
}
var liveProfileGR = new GlideRecord("live_profile");
liveProfileGR.addQuery("document",gs.getUser().getID());
liveProfileGR.query();

data.liveProfileId = "";

if (liveProfileGR.next()) {
	data.liveProfileId = liveProfileGR.getUniqueValue();
}
if (data.menu && data.menu.data) {
	data.menu.data.replace = true;
	// Hide login if menu already has link to login
	data.hasLogin = false;
	if (data.menu.data.menu.items) {
		var notifications = [];
		for(var i in data.menu.data.menu.items) {
			var item = data.menu.data.menu.items[i];
			if (item.type == 'page' && item.sp_page == data.login_page)
				data.hasLogin = true;
			if(item.type == 'scripted')
				notifications.push(item);
		}
		data.notifications = notifications;
	}
}

// Determine if Support profile should be enabled
// This is needed to correctly configure the "Support profile" link in the dropdown
// Show the Support profile only if the logged in user has customer/consumer roles and sys_user_class
// The sys_user_class check is for Systme Admin so that system admin does not see the Support Profile link
data.enableSupportProfile = false;
data.enableCommProfile = false;
data.supportProfilePortal = "";
data.supportPortalPrefix = "";
data.hasConsumerRole = gs.getUser().hasRole('sn_customerservice.consumer');
data.hasCustomerRole = gs.getUser().hasRole('sn_customerservice.customer');
data.isCommunityEnabled = GlidePluginManager().isActive('com.sn_communities');
data.isCommunityDemoDataEnabled = GlidePluginManager().isActive('com.sn_communities_demo');
var CSM_CONSUMER_USER = 'csm_consumer_user';
var CSM_CONTACT_USER = 'customer_contact';
var csp_profile = 'csp_profile';
var csm_profile = 'csm_profile';
var default_profile = 'user_profile';

var sysUserGR = new GlideRecord("sys_user");
if (sysUserGR.get(gs.getUser().getID())) {
	data.userClass = sysUserGR.getValue("sys_class_name");
}

if ((GlidePluginManager().isActive('com.glide.service-portal.consumer-portal') ||
     GlidePluginManager().isActive('com.glide.service-portal.customer-portal')) && ( (data.hasConsumerRole && data.userClass == CSM_CONSUMER_USER) || (data.hasCustomerRole && data.userClass == CSM_CONTACT_USER))) {
    data.enableSupportProfile = true;
}

if ((GlidePluginManager().isActive('com.sn_communities')) && ((data.hasConsumerRole && data.userClass == CSM_CONSUMER_USER) || (data.hasCustomerRole && data.userClass == CSM_CONTACT_USER))) {
    data.enableCommProfile = true;
}

if (data.hasConsumerRole && data.userClass == CSM_CONSUMER_USER) {
    data.supportProfilePortal = csp_profile;
	data.supportPortalPrefix = "csp";
	
} else if (data.hasCustomerRole && data.userClass == CSM_CONTACT_USER) {
    data.supportProfilePortal = csm_profile;
	data.supportPortalPrefix = "csm";
} else {
	data.supportProfilePortal = default_profile;
	data.supportPortalPrefix = "csm";
}
data.optionsSearch = "{title: 'Search All Sources', limit: 10}";
data.loginWidget = $sp.getWidgetFromInstance('login-modal-unified');
data.typeahead = $sp.getWidget('typeahead-search', data.optionsSearch);