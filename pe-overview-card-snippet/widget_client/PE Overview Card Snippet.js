function OverviewCardSnippetController(spUtil) {
  /* widget controller */
  var c = this;

  spUtil.get('pe-people-info', {
    user_sys_id: c.data.user_sys_id,
    show_job_title: 'false',
    show_call_and_chat: 'false',
    show_only_picture: 'false',
    show_text_below_picture: 'true'
  }).then(function (response) {
    c.data.embedded_widget_1 = response;
  });


}