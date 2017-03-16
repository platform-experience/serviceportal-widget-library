(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'Attack Profile';
})();