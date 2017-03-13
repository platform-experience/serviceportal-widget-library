(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.user_sys_id = gs.getUserID();
  data.title = input.title || options.title;
  data.text = "Starts in";
  data.days = "2 days";

  //data.status = "complete";
  data.status = "in_progress";
  data.state = "In Progress";

  data.percent = "27";
  data.depts = [{
    "name": "IT",
    "color": "rgb(148, 189, 105)"
  }, {
    "name": "HR",
    "color": "rgb(98, 173, 202)"
  }, {
    "name": "FA",
    "color": "rgb(135, 126, 199)"
  }, {
    "name": "EMP",
    "color": "rgb(184, 124, 181)"
  }];

})();