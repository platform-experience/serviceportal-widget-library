function JiraIssuesController() {
  var c = this;

  c.$onInit = function() {
    c.limit = c.options.limit;
    c.showMore = showMore;
    c.showLess = showLess;
  };

  c.server.get({ jira: true }).then(function(r) {
    c.myIssues = r.data.responseBody.issues;
  });

  function showMore() {
    c.limit = c.myIssues.length;
  }

  function showLess() {
    c.limit = c.options.limit;
  }
}
