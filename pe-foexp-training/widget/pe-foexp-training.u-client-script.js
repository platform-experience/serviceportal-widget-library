function TrainingController() {
  var c = this;

  c.enroll = function (item) {
    c.server.get({
      action: 'enroll',
      sys_id: item.course
    }).then(function (result) {
      item.enrolled = result.data.enrolled;
    });
  };

  c.remove = function (item) {
    c.server.get({
      action: 'remove',
      sys_id: item.course
    }).then(function () {
      item.enrolled = null;
    });
  };
}