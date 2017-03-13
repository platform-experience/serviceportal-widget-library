(function() {
  var userGr = GlideRecord('sys_user');
  userGr.addQuery('department', 'ab960aa4db61b200b793f2b6ae9619aa');
  userGr.orderBy('sys_created_on');
  userGr.query();
  data.users = [];
  while (userGr.next()) {
    obj = {};
    $sp.getRecordElements(obj, userGr, 'sys_id, first_name, last_name, title, photo');
    data.users.push(obj);
  }
})();