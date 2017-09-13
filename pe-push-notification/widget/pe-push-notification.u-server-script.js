(function () {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  data.notification = {};
  data.notification.page = serverOptions.page || options.page;
  data.notification.time = serverOptions.home_time || options.home_time;
  data.notification.date = serverOptions.home_date || options.home_date;
  data.notification.title = serverOptions.notification_title || options.notification_title;
  data.notification.when = serverOptions.notification_time || options.notification_time;

  data.notification.body = {};
  data.notification.body.title = serverOptions.body_title || options.body_title;
  data.notification.body.text = serverOptions.body_text || options.body_text;
  data.notification.background_image = serverOptions.background_image || options.background_image;

  data.notification.title = gs.getMessage(data.notification.title);
  data.notification.body.title = gs.getMessage(data.notification.body.title);
  data.notification.body.text = gs.getMessage(data.notification.body.text);
})();