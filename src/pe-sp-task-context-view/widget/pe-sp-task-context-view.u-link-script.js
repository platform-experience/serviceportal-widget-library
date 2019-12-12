function link(scope, element, attrs, controller) {
  controller.toggleSidebar = function() {
    $("#x_pisn_sp_ctx_view_sidebar").toggleClass("collapsed");
    $("#x_pisn_sp_ctx_view_content").toggleClass("col-sm-12");
  };
}
