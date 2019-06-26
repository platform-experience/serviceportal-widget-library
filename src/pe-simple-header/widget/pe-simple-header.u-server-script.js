(function() {
	function getTF(val){
		var rtn = false;
		var type = typeof val;
		if(type==='boolean'){ rtn = val; }
		if(type==='number'){ rtn = (val===1); }
		if(type==='string'){
			val = val.toLowerCase();
			rtn = (val === 'true' || val==='t');
		}

		return rtn;
	}
	function getMenu(id){
		var menu = {};
		if(id){
			menu = $sp.getWidgetFromInstance(id);

			if(menu.data.menu){
				menu.isWidget = true;
			}else{
				menu.isWidget = false;
				menu.data = {
					menu: {
						items: $sp.getMenuItems(id)
					}
				};
			}
			menu.data.replace = true;
			// Hide login if menu already has link to login
			data.hasLogin = false;
			if (menu.data.menu.items) {
				for(var i in menu.data.menu.items) {
					var item = menu.data.menu.items[i];
					if (item.type == 'page' && item.sp_page == data.login_page)
						data.hasLogin = true;
				}
			}
		}

		return menu;
	}
	//Defalut FontAwesome Icons - https://fontawesome.com/v4.7.0/icons/
	data.icons = {
		solid : {
			profile : 'fa-user-circle',
			chat : 'fa-comment',
			agent: 'fa-commenting',
			alert : 'fa-bell',
			msg : 'fa-envelope'
		},
		open : {
			profile : 'fa-user-circle-o',
			chat : 'fa-comment-o',
			agent: 'fa-commenting-o',
			alert : 'fa-bell-o',
			msg : 'fa-envelope-o'
		}
	};

	/* Variables Local and Client */
	var session = gs.getSession();

	data.isLoggedIn = session.isLoggedIn();

	//Get Quick Start Config for the Portal
	var qsConfig = $sp.getValue("quick_start_config");
	var qsConfigJson = qsConfig ? JSON.parse(qsConfig)[0] : {};

	data.qsConfig = qsConfigJson;	
	data.chatType = 'Live';
	data.login_page = $sp.getValue('login_page');
	if(data.qsConfig.loginWidget){
		data.loginWidget = $sp.getWidgetFromInstance(data.qsConfig.loginWidget);
	}else{
		data.loginWidget = $sp.getWidgetFromInstance('login-modal');
	}

	if(!data.qsConfig.chatIcon){
		if(!data.qsConfig.useVirtualAgent){
			data.qsConfig.chatIcon = data.icons.solid.chat;
		}else{
			data.qsConfig.chatIcon = data.icons.solid.agent;
			data.chatType = 'Agent';
		}
	}
	if(data.qsConfig.boxshadow){
		data.showBoxShadow = getTF(data.qsConfig.boxshadow);
	}

	if(data.qsConfig.search){
		data.typeahead = $sp.getWidget(data.qsConfig.search);
	}
	
	data.backToTop = true;
	if(data.qsConfig.backToTop){
		data.backToTop = getTF(data.qsConfig.backToTop);
	}
	
	// Show tours only if gtd's sp sys property is set
	data.showTours = (gs.getProperty('com.snc.guided_tours.sp.enable') === 'true') && data.isLoggedIn;

	data.menu = {
		items : []
	};
	
	var menu = $sp.getValue("sp_rectangle_menu");
	if(menu){
		data.menu = getMenu(menu);
	}
	
	//Get Secondary Menu
	var secondaryMenuInstance = qsConfigJson.secondaryMenu ? qsConfigJson.secondaryMenu.sys_id : undefined;
	if(secondaryMenuInstance){
		data.secondaryMenu = getMenu(secondaryMenuInstance);
	}


	//Portal Configuration for a Menu when there is not one identified by the Portal 'Main menu'
	if(!data.menu && (data.qsConfig.auto_menu == true || data.qsConfig.auto_menu == 'true' || data.qsConfig.auto_menu == 1 || data.qsConfig.auto_menu == '1')){
		data.menu = {
			items : []
		};
		if($sp.getValue("kb_knowledge_page")){
			data.menu.items.push({
				glyph: 'book',
				label: 'Knowledge Base',
				href: '?id=' + $sp.getDisplayValue("kb_knowledge_page"),
				sys_id: $sp.getValue("kb_knowledge_page"),
				url_target: '_self',
				items : []
			});
		}
		if($sp.getValue("sc_catalog_page")){
			data.menu.items.push({
				glyph: 'th-large',
				label: 'Service Catalog',
				href: '?id=' + $sp.getDisplayValue("sc_catalog_page"),
				sys_id: $sp.getValue("sc_catalog_page"),
				url_target: '_self',
				items : []
			});
		}
	}

	//Shopping Cart and Wishlist
	var catalogArr = ($sp.getCatalogs().value + "").split(",");
	catalogArr.forEach(function(catalog) {
		if(data.menu.data && !data.menu.data.showWishlist){
			data.menu.data.showWishlist = new sn_sc.Catalog(catalog).isWishlistEnabled();
		}
	});

	if (data.isLoggedIn) {
		if(data.menu.data){
			if (data.menu.data.showWishlist){
				data.menu.data.wishlistWidget = $sp.getWidget("sc_wishlist_cart", {wishlistTemplate: "small_wishlist.html", auto_update_wishlist:options.auto_update_wishlist});
			}
			if (gs.getProperty("glide.sc.portal.use_cart_v2_header", "false") === "true"){
				data.menu.data.cartWidget = $sp.getWidget("sc-shopping-cart-v2", {cartTemplate: "small_shopping_cart_v2.html", auto_update_cart:options.auto_update_cart});
			}else{
				data.menu.data.cartWidget = $sp.getWidget("sc-shopping-cart", {cartTemplate: "small_shopping_cart.html", auto_update_cart:options.auto_update_cart});
			}
		}
		if(data.menu.data && data.secondaryMenu.data){
			if (!data.menu.data.showWishlist && !data.secondaryMenu.data.showWishlist){
				data.secondaryMenu.data.wishlistWidget = $sp.getWidget("sc_wishlist_cart", {wishlistTemplate: "small_wishlist.html", auto_update_wishlist:options.auto_update_wishlist});
			}
			if (gs.getProperty("glide.sc.portal.use_cart_v2_header", "false") === "true"){
				data.secondaryMenu.data.cartWidget = $sp.getWidget("sc-shopping-cart-v2", {cartTemplate: "small_shopping_cart_v2.html", auto_update_cart:options.auto_update_cart});
			}else{
				data.secondaryMenu.data.cartWidget = $sp.getWidget("sc-shopping-cart", {cartTemplate: "small_shopping_cart.html", auto_update_cart:options.auto_update_cart});
			}
		}
		
	}


	// Defines the support queue ID that will be linked to by the Live Chat link in header
	data.connect_support_queue_id = $sp.getValue('sp_chat_queue');
	if(data.qsConfig.default_interaction_queue){
		data.interaction_queue_id = data.qsConfig.default_interaction_queue;
	}
	
	data.profileBtnMsg = gs.getMessage("User options");
	/** CSM Chat Support **/
	if(data.qsConfig.useVirtualAgent && ((data.qsConfig.useVirtualAgent === true)||(data.qsConfig.useVirtualAgent==='true'))){
		data.queueType = "connect";
		var liveAgent = new GlideRecord("sys_cs_live_agent_setup");

		liveAgent.query();
		if (liveAgent.next()) {
			data.queueType = liveAgent.getValue("csm_fulfiller");
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
			var contactUrl = "";
			var accountUrl = "";

			data.useChatWidgetForCSM = true;
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
			} else {
				csmQueue = data.interaction_queue_id;
			}
			var va_parms = "sysparm_liveagent_application=csm&sysparm_liveagent_queue="+csmQueue+contactUrl+accountUrl+liveAgentUrl;

			data.va_chat = $sp.getWidget('sn-va-sp-widget',{
				va_url_params:va_parms
			});
		}
	}


})();