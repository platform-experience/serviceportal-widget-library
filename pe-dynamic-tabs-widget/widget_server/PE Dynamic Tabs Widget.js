(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  //data.threetabs
  var userGR = new GlideRecord('sys_user');
  userGR.addQuery('sys_id', gs.getUserID());
  userGR.query();

  while (userGR.next()) {
    data.user_first_name = userGR.getDisplayValue('first_name');
    data.user_last_name = userGR.getDisplayValue('last_name');
    data.user_full_name = userGR.getDisplayValue('name');
    data.user_job_title = userGR.getDisplayValue('title');
    data.user_photo = userGR.getDisplayValue('photo');
    data.user_phone = userGR.phone.toString().replace(/[- )(]/g, '');
    data.user_initials = data.user_first_name.charAt(0) + data.user_last_name.charAt(0);
  }


})();