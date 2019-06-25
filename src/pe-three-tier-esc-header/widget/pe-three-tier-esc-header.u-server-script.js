(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	// Portal catalog and knowledge
	data.portal = $sp.getPortalRecord();
	data.logo = data.portal.getDisplayValue('logo');
	data.urlSuffix = data.portal.getDisplayValue('url_suffix') || 'esc';
	data.catalog = data.portal.getDisplayValue('sc_catalog_page') || 'esc_sc_category';
	data.knowledge = data.portal.getDisplayValue('kb_knowledge_page') || 'esc_knowledge_home';
	
	// Typeahead search
	var typeaheadOptions = {"size":"lg", "title": options.search_title};
	data.typeahead = $sp.getWidget('typeahead-search', typeaheadOptions);
	
	// To-dos data
	var myTodosCountObject= new sn_hr_sp.todoPageUtils().getMyTodosCount();
	data.todoCount = myTodosCountObject.todoCount;
	data.recordWatchers = myTodosCountObject.recordWatchers;

	data.link = '?id=hrd_user_profile&sys_id='+ gs.getUserID();
	
	// VA data
	data.isMobile = gs.isMobile();
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

		var portal = $sp.getPortalRecord().getDisplayValue('url_suffix');

		var va_parms = "sysparm_portal="+portal //+"&sysparm_liveagent_application=csm&sysparm_liveagent_queue="+csmQueue+contactUrl+accountUrl+liveAgentUrl;

		data.va_chat = $sp.getWidget('sn-va-sp-widget',{
			va_url_params:va_parms
		});
	}

})();