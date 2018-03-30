function KBListController($sce) {
  var c = this;

  c.$onInit = function() {
    c.data.articles.forEach(function(article) {
      article.text = $sce.trustAsHtml(article.text);
    });
  };
}
