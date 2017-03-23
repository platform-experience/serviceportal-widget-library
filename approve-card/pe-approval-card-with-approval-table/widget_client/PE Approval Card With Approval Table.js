function ApprovalCardController(spUtil) {
  var c = this;

  c.approve = approve;

  c.reject = reject;

  c.view = view;

  c.data.widget = {
    title: c.data.task.short_description.display_value || c.options.title,
    purpose: c.options.purpose || c.data.task.request_item.display_value,
    icon: c.options.icon
  };

  c.data.user_info = {
    user_sys_id: c.data.task.assigned_to.value,
    show_only_picture: false,
    show_job_title: true,
    show_call_and_chat: false
  };

  spUtil.get('pe-people-info', {
    user_sys_id: c.data.user_info.user_sys_id,
    show_job_title: c.data.user_info.show_job_title,
    show_call_and_chat: c.data.user_info.show_call_and_chat,
    show_only_picture: c.data.user_info.show_only_picture
  }).then(function (response) {
    c.data.embedded_widget = response;
  });

  function approve() {
    c.server.get({action: 'approve'}).then(function () {
      $rootScope.$broadcast('cart-solved', {card: c, status: 'approved'});
      c.submitted = true;
    })
  }

  function reject() {
    c.server.get({action: 'reject'}).then(function () {
      $rootScope.$broadcast('cart-solved', {card: c, status: 'rejected'});
      c.submitted = true;
    })
  }

  function view() {
    $rootScope.$broadcast('cart-view', {table: "x", record: 'y'});
  }
}