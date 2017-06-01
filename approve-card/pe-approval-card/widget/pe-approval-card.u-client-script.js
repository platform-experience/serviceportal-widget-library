function ApprovalCardController(spUtil) {
  var c = this;

  c.$onInit = function() {
    getUserInfo();
    getWidgetOptions();
    activateWidget();
  };

  function activateWidget() {
    spUtil.get('pe-people-info', {
      userSysId: c.data.userInfo.user_sys_id,
      showOnlyPicture: c.data.userInfo.show_job_title,
      showJobTitle: c.data.userInfo.show_call_and_chat,
      showCallAndChat: c.data.userInfo.show_only_picture
    }).then(function(response) {
      c.data.peopleInfoWidget = response;
    });
  }

  function getUserInfo() {
    c.data.userInfo = {
      userSysId: '9ec35b8713453a007e94fc5ed144b09a',
      showOnlyPicture: false,
      showJobTitle: true,
      showCallAndChat: false
    };
  }

  function getWidgetOptions() {
    c.data.widget = {
      title: c.options.title,
      purpose: c.options.purpose,
      icon: c.options.icon
    };
  }
}