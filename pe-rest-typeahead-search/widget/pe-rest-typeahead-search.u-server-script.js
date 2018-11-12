(function () {
  data.uri = gs.getProperty('glide.servlet.uri');
  options.overlay = options.overlay == 'true' || options.overlay == true;
  options.order_by = options.order_by || options.display_field;
  data.currentUUsername = gs.getUserName();
  data.currentUPassword = gs.getUser().getValue('user_password');
})();
