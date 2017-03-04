function ApprovalCardController(spUtil) {
  var c = this;

  c.data.widget = {
    title: c.options.title,
    purpose: c.options.purpose,
    icon: c.options.icon
  };

  c.data.user_info = {
    user_sys_id: '9ec35b8713453a007e94fc5ed144b09a',
    show_only_picture: false,
    show_job_title: true,
    show_call_and_chat: false
  };

  spUtil.get('pe-people-info', {
    user_sys_id: c.data.user_info.user_sys_id,
    show_job_title: c.data.user_info.show_job_title,
    show_call_and_chat: c.data.user_info.show_call_and_chat,
    show_only_picture: c.data.user_info.show_only_picture
  }).then(function(response) {
    c.data.embedded_widget = response;
  });
}