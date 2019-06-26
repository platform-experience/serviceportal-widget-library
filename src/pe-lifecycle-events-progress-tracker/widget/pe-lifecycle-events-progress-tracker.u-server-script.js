(function() {

  data.primary_color = options.primary_color || input.primary_color;
  data.background_color = options.background_color || input.background_color;
  data.chart_width = options.chart_width || input.chart_width;
  data.font_size = options.font_size || input.font_size;
  data.font_weight = options.font_weight || input.font_weight;

  var events = [];

  var assigned_to = $sp.getParameter('assigned_to') || gs.getUserID();
  var grTask = new GlideRecord('sn_hr_core_task');
  grTask.addNotNullQuery();
  grTask.addQuery('assigned_to', assigned_to);
  grTask.addEncodedQuery('sn_hr_le_activityISNOTEMPTY');

  grTask.query();

  while (grTask.next()) {
    try {
      var grCase = new GlideRecord('sn_hr_le_case');
      grCase.get(grTask.getValue('parent'));
      var util = new hr_PortalUtil(grCase);

      var event = {
        sys_id: grTask.sn_hr_le_activity.activity_set.le_type.toString(),
        parent: grCase.getUniqueValue(),
        title: util.getCaseTitle()
      };
      var set = {
        sys_id: grTask.sn_hr_le_activity.activity_set.toString(),
        complete: grTask.getValue('state') == 3 ? 1 : 0, // Closed complete
        total: 1
      };

      if (!events.some(function(ev) { return event.sys_id == ev.sys_id; })) { // First LE occurrence
        // Get all activity sets
        var activitySetInfo = util.getActivitySetContexts(grCase.getUniqueValue());
        $sp.log(activitySetInfo.contexts);

        var activitySets = activitySetInfo.contexts.map(function(context) {
          var grContext = new GlideRecord('sn_hr_le_activity_set_context');
          grContext.get(context.id);
          var activitySet = {
            sys_id: grContext.getValue('activity_set'),
            title: context.name,
            state: context.state,
            complete: 0,
            total: 0
          };
          if (set.sys_id == activitySet.sys_id) { // Current task activity set
            return {
              sys_id: activitySet.sys_id,
              title: activitySet.title,
              state: activitySet.state,
              complete: set.complete,
              total: set.total
            };
          }
          return activitySet;
        });

        events.push({
          sys_id: event.sys_id,
          title: event.title,
          parent: event.parent,
          activity_set: activitySets
        });
      } else {
        events.forEach(function(e) {
          if (event.sys_id == e.sys_id) {
            e.activity_set.forEach(function(s) {
              if (set.sys_id == s.sys_id) {
                s.complete += set.complete;
                s.total += 1;
              }
            });
          }
        });
      }
    } catch (e) {
      var tableName = '';
      e.toString().split(' ').forEach(function(word) {
        if (word.startsWith('sn_hr')) {
          tableName = word;
        }
      });

      var grWidget = $sp.getInstanceRecord();
      var grTable = new GlideRecord('sys_db_object');
      var widgetID = grWidget.getValue('sp_widget')
      grTable.get('name', tableName);

      var grRCA = new GlideRecord('sys_restricted_caller_access');
      grRCA.addQuery('source', widgetID);
      grRCA.addQuery('target', grTable.getUniqueValue());
      grRCA.query();
      if (grRCA.next()) {
        data.errorLink = '/nav_to.do?uri=/sys_restricted_caller_access.do?sys_id=' + grRCA.getUniqueValue();
      } else {
        data.errorLink = '/nav_to.do?uri=/sys_restricted_caller_access_list.do?sysparm_query=source=' + widgetID;
      }
      break;
    }
  }

  data.events = events.map(function(evnt) { return evnt.title; });

  if (data.events.length <= 0) {
    return;
  }

  data.donuts = [];
  events.forEach(function(evt) {
    evt.activity_set.forEach(function(aSet) {
      if (aSet.state == 'finished') {
        aSet.percentage = '100%';
        aSet.total = 1;
        aSet.complete = 1;
      } else if (aSet.total == 0) {
        aSet.percentage = '0%';
        aSet.total = 1;
        aSet.complete = 0;
      } else {
        aSet.percentage = Math.round(aSet.complete / aSet.total * 100) + '%';
      }
      data.donuts.push({
        percentage: aSet.percentage,
        complete: aSet.complete,
        total: aSet.total,
        title: aSet.title,
        event: evt.title,
        href: '?id=hrm_ticket_page&sys_id=' + evt.parent
      });
    });
  });
})();