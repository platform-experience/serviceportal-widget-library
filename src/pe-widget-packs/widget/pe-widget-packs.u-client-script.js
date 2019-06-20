function widgetPackController() {
  /* widget controller */
  var c = this;

  c.$onInit = function () {
    c.show = true;
    c.loading = false;
    c.getWidgetAndAssign = getWidgetAndAssign;
  };


  function getWidgetAndAssign(widget) {
    c.show = false;
    c.loading = true;
    c.data.myWidget = "";
    c.server.get({
      id: widget.id,
      combi_sysid: widget.pack_combi_sysid,
      widget_option: JSON.parse(widget.options),
      getWidget: true
    }).then(function (r) {
      console.log(r);
      c.data.myWidget = r.data.myWidget;
      c.show = true;
      c.loading = false;
    });
  }


}