(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  if (!input) {
    data.widgetPack = [];
    data.myWidget = "";

    if (options.u_pack) {
      $sp.log(options.u_pack);
      var wpacksGR = new GlideRecord('u_widgets_and_packs');
      wpacksGR.addQuery('pack', options.u_pack);
      wpacksGR.query();
      while (wpacksGR.next()) {
        var widget = {};
        widget.name = wpacksGR.u_widget.name.toString();
        widget.id = wpacksGR.u_widget.id.toString();
        widget.sys_id = wpacksGR.u_widget;
        widget.order = wpacksGR.getValue('order');
        widget.options = wpacksGR.getValue('widget_options');
        widget.pack_combi_sysid = wpacksGR.sys_id.toString();
        data.widgetPack.push(widget);

      }
      $sp.log(data.widgetPack);

      var userWidgetGr = new GlideRecord('u_user_and_widget');
      userWidgetGr.addQuery('u_user', gs.getUserID());
      userWidgetGr.addQuery('u_widget.pack', options.u_pack);
      userWidgetGr.query();
      if (userWidgetGr.next()) {
        $sp.log(userWidgetGr.u_widget.u_widget.id);
        var widgetOptions = userWidgetGr.u_widget.widget_options.toString();
        if (widgetOptions) {
          data.myWidget = $sp.getWidget(userWidgetGr.u_widget.u_widget.id, JSON.parse(widgetOptions));
        } else {
          data.myWidget = $sp.getWidget(userWidgetGr.u_widget.u_widget.id, {});
        }

      }

    }
  } else {
    if (input.getWidget) {
      var gr = new GlideRecord('u_user_and_widget');
      gr.addQuery('u_user', gs.getUserID());
      gr.addQuery('u_widget.pack', options.u_pack);
      gr.query();
      if (gr.next()) {
        gr.deleteRecord();
      }
      gr.initialize();
      gr.u_user = gs.getUserID();
      gr.u_widget = input.combi_sysid;
      gr.insert();

      data.myWidget = $sp.getWidget(input.id, input.widget_option);
    }
  }


})();