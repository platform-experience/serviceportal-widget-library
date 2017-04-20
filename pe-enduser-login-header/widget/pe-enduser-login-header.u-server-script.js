(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = serverOptions.title || options.title;
  options.subtitle_line_1 = serverOptions.subtitle_line_1 || options.subtitle_line_1;
  options.subtitle_line_2 = serverOptions.subtitle_line_2 || options.subtitle_line_2;
  options.logo = 'fa-' + (serverOptions.logo || options.logo);
})();