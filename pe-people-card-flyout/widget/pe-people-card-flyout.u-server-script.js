(function() {
  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.title = options.title || serverOptions.title;
  options.number1 = options.number_1 || serverOptions.number_1;
  options.number2 = options.number_2 || serverOptions.number_2;
  options.number3 = options.number_3 || serverOptions.number_3;
  options.subText1 = options.sub_text_1 || serverOptions.sub_text_1;
  options.subText2 = options.sub_text_2 || serverOptions.sub_text_2;
  options.subText3 = options.sub_text_3 || serverOptions.sub_text_3;

  var userGr = GlideRecord('sys_user');
  userGr.addQuery('department', '48197fb4dbe5b20062e479daae96191f');
  userGr.orderBy('sys_created_on');
  userGr.query();
  data.users = [];
  while (userGr.next()) {
    obj = {};
    $sp.getRecordElements(obj, userGr, 'sys_id, first_name, last_name, title, photo');
    data.users.push(obj);
  }
  data.users[0].time_ago = '18m';
  data.users[1].time_ago = '6m';
  data.users[2].time_ago = '41m';
  data.users[3].time_ago = '15m';
})();