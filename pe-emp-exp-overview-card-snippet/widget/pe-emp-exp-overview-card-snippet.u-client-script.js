function OverviewCardController(spUtil) {
  var c = this;

  c.$onInit = function() {
    activateWidget();
  };

  function activateWidget() {
    spUtil.get('pe-people-info', {
      user_sys_id: c.data.user_sys_id,
      show_job_title: false,
      show_call_and_chat: false,
      show_only_picture: false,
      show_text_below_picture: true
    }).then(function(response) {
      c.data.peopleInfoWidget = response;
    });
  }
}