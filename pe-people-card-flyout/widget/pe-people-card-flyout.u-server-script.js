(function() {

  (function activate() {
    getDepartmentPeople();
    setServerOptions();
  })();

  function setServerOptions() {
    var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
    options.department = options.department || serverOptions.department;
    options.title = options.title || serverOptions.title;
    options.number1 = options.number1 || serverOptions.number1;
    options.number3 = options.number3 || serverOptions.number3;
    options.subText1 = options.subText1 || serverOptions.subText1;
    options.subText3 = options.subText3 || serverOptions.subText3;
  }

  function getRandomNumberRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getDepartmentPeople() {
    var userGr = GlideRecord('sys_user');
    userGr.addQuery('department', options.department);
    userGr.orderBy('sys_created_on');
    userGr.query();
    data.users = [];
    while (userGr.next()) {
      obj = {};
      obj.timeAgo = getRandomNumberRange(1, 59);
      $sp.getRecordElements(obj, userGr, 'department, first_name, last_name, title, photo');
      data.users.push(obj);
    }
  }
})();