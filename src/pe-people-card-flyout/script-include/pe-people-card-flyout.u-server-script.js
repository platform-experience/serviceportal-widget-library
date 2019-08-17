var PeopleCardService = Class.create();
PeopleCardService.prototype = {
  initialize: function() {},

  getNumberRange: function(minimum, maximum) {
    var min = Math.ceil(minimum);
    var max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getUsers: function(id) {
    var userGr = new GlideRecord('sys_user');
    userGr.addQuery('department.id', id);
    userGr.orderBy('sys_created_on');
    userGr.query();
    var users = [];
    var fields = 'department, first_name, last_name, title, photo';
    while (userGr.next()) {
      obj = {};
      obj.timeAgo = this.getNumberRange(1, 59);
      $sp.getRecordElements(obj, userGr, fields);
      users.push(obj);
    }
    return users;
  },

  type: 'PeopleCardService'
};
