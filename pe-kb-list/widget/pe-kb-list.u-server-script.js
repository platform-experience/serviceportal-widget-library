(function() {
  var grKb = new GlideRecordSecure('kb_knowledge');
  grKb.addQuery('kb_category', options.kb_category);
  grKb.orderBy('published');
  grKb.setLimit(options.limit || 5);
  grKb.query();

  var articles = [];
  while (grKb.next()) {
    articles.push({
      title: grKb.short_description.toString(),
      text: grKb.text.toString()
    });
  }
  data.articles = articles;
})();
