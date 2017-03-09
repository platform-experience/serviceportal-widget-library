(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title || 'Business Critical Services';
  options.statusIndicator2 = options.status_indicator2 || serverOptions.status_indicator2 || 'warning';
  options.statusIndicator3 = options.status_indicator3 || serverOptions.status_indicator3 || 'normal';
  options.statusNumber1 = options.status_number1 || serverOptions.status_number1 || 5;
  options.statusNumber2 = options.status_number2 || serverOptions.status_number2 || 148;
  options.statusNumber3 = options.status_number3 || serverOptions.status_number3 || 78;
  options.subText1 = options.sub_text1 || serverOptions.sub_text1 || 'With Critical Incidents';
  options.subText2 = options.sub_text2 || serverOptions.sub_text2 || 'Severe Vulnerabilities';
  options.subText3 = options.sub_text3 || serverOptions.sub_text3 || 'Control Effectiveness';
})();