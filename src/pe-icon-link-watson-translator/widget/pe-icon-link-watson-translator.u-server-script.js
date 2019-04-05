(function() {
  var watson = new LanguageService();
  var source = 'English';
  data.title =
    options.language === source ? options.title : watson.translate(options.title, options.language);
  data.shortDescription =
    options.language === source
      ? options.short_description
      : watson.translate(options.short_description, options.language);

  var gr = $sp.getInstanceRecord();
  data.href = $sp.getMenuHREF(gr);
  data.target = options.target || '';
})();
