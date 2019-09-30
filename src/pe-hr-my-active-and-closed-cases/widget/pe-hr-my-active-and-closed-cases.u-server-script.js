(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  data.myActiveCaseCount = getCaseCount('true');
  data.myClosedCaseCount = getCaseCount('false');

  var openCaseOptions = { "is_active": "true" };
  var closedCaseOptions = { "is_active": "false" };

  data.myActiveCaseListWidget = $sp.getWidget('hr-my-cases-list', openCaseOptions);
  data.myClosedCaseListWidget = $sp.getWidget('hr-my-cases-list', closedCaseOptions);

  function getCaseCount(isActive) {
    var gr = new GlideRecord('sn_hr_core_case');
    gr.addEncodedQuery('active=' + isActive + '^subject_personDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORopened_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORopened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe');
    gr.query();

    return gr.getRowCount();
  }

  function getToDoCount() {
    var arr = [];
    var util = new sn_hr_sp.todoPageUtils();
    data.queryLimit = todoPageUtils.QUERY_LIMIT;
    data.todosToShow = util.getMyTodos(data.queryLimit);
    arr = data.todosToShow.recordsToShow;

    return arr.length;
  }
})();