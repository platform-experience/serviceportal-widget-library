(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.notification = {};
  data.notification.page = input.page || options.page;
  data.notification.time = input.home_time || options.home_time;
  data.notification.date = input.home_date || options.home_date;
  data.notification.title = input.notification_title || options.notification_title;
  data.notification.when = input.notification_time || options.notification_time;
  data.notification.body = {};
  data.notification.body.title = input.body_title || options.body_title;
  data.notification.body.text = input.body_text || options.body_text;
  data.notification.background_image = input.background_image || options.background_image;
  data.notification.title = gs.getMessage(data.notification.title);
  data.notification.body.title = gs.getMessage(data.notification.body.title);
  data.notification.body.text = gs.getMessage(data.notification.body.text);
})();