(function() {
  var sys_id = $sp.getParameter('sys_id');
  data.userSysID = gs.getUserID();

  data.tasks = [];
  var obj;

  if (!sys_id) {return;}

  var hrGlideRecord = new GlideRecord('sn_hr_le_case');
  if (hrGlideRecord.get(sys_id)) {
    data.tasks = [];
    data.message = gs.getMessage(
      'Please make sure to complete these tasks in a timely manner so you can start your new job smoothly.'
    );
    data.title = hrGlideRecord.short_description.toString();
    data.description = hrGlideRecord.description.toString();

    var grCase = new GlideRecord('sn_hr_core_case');

    if (grCase.get(sys_id)) {
      var util = new hr_PortalUtil(grCase);
      data.panels = util.getFilterPanels(data.onTicketPage);

      var onboardingGr = new GlideRecord('sn_hr_core_task');
      var parentQuery = onboardingGr.addQuery('parent', sys_id); // TODO Make this dynamic
      parentQuery.addOrCondition('parent.parent', sys_id);
      parentQuery.addOrCondition('parent.parent.parent', sys_id);
      onboardingGr.addQuery('assigned_to', data.userSysID);

      onboardingGr.orderBy('due_date');
      onboardingGr.query();
      while (onboardingGr.next()) {
        obj = {
          short_description: onboardingGr.short_description.toString(),
          due_date: onboardingGr.getDisplayValue('due_date'),
          state: onboardingGr.state.toString(),
          sys_id: onboardingGr.sys_id.toString()
        };
        data.tasks.push(obj);
      }
    }
  }
})();
