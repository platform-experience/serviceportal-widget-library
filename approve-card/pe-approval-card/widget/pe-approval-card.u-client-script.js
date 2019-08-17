function ApprovalCardController(spUtil) {
  var c = this;

  c.$onInit = function() {
    getPeopleInfo();
  };

  function getPeopleInfo() {
    spUtil.get('pe-people-info').then(function(result) {
      c.peopleInfo = result.data ? result : null;
      setWidgetOptions();
    });
  }

  function setWidgetOptions() {
    c.widget = {
      title: c.options.title,
      purpose: c.options.purpose,
      icon: c.options.icon
    };
  }
}