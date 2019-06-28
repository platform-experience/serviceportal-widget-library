function ChildActivityController($scope, $log, spUtil, spModal, $rootScope) {
  var c = this;

  var buildHierarchy = function (taskList) {
    return c.data.tasks.filter(function (t) {
      return t.parent == c.data.sys_id;
    }).map(createTaskNode);
  };

  var buildChildNodes = function (parentID) {
    return c.data.tasks.filter(function (t) {
      if (t.parent == parentID)
        t.child = true;
      return t.parent == parentID;
    }).map(createTaskNode);
  };

  var createTaskNode = function (taskData) {
    return {
      id: taskData.sys_id,
      data: taskData,
      children: buildChildNodes(taskData.sys_id)
    };
  };

  c.havePendingActions = function (taskID) {
    return c.havePendingApproval(taskID);
  };

  c.approve = function (approvalID) {
    var payload = {
      action: 'approved',
      approval_id: approvalID
    };
    c.server.get(payload).then(function (response) {});
  };

  c.havePendingApproval = function (taskID) {
    return c.getPendingApprovalForTask(taskID) != null;
  };

  c.getPendingApprovalForTask = function (taskID) {
    return c.data.approvals.filter(function (a) {
      return a.sysapproval == taskID && a.is_mine && a.state == 'requested';
    })[0];
  };

  c.task_hierarchy = buildHierarchy(c.data.tasks);

  c.editTask = function (taskData) {
    spModal.open({
      title: '${Editing}' + ' ' + taskData.number,
      widget: 'widget-form',
      buttons: [{
        label: '${Close}',
        cancel: true
      }],
      footerStyle: {
        'display': 'none'
      },
      size: 'lg',
      widgetInput: {
        table: taskData.table,
        sys_id: taskData.sys_id,
        view: c.options.view
      }
    });
  };

  c.toggleTasksView = function (taskId) {
    c.toggleCollapse(taskId);
  };

  c.hasAttachments = function (taskID) {
    return c.getAttachments(taskID).length > 0;
  };

  c.getAttachments = function (taskID) {
    return c.data.attachments.filter(function (att) {
      return att.table_sys_id == taskID;
    });
  };

  spUtil.recordWatch($scope, c.options.table, 'sys_idIN' + c.data.task_ids, function (data) {
    c.server.update().then(function (data) {
      c.task_hierarchy = buildHierarchy(data.tasks);
    });
  });

  spUtil.recordWatch($scope, 'sys_attachment', 'table_nameIN' + c.data.task_tables, function (data) {
    c.server.update().then(function (data) {
      c.task_hierarchy = buildHierarchy(data.tasks);
    });
  });

  $rootScope.$on('sp.form.record.updated', function (event, obj) {
    c.closeModal();
  });

  $rootScope.$on('spModel.gForm.initialized', function (event, gFormInstance) {
    c.cssModal();
    if (gFormInstance.getUniqueValue() == c.data.sys_id) {
      var fields = gFormInstance.getFieldNames();
      for (var i = 0; i < fields.length; i++)
        gFormInstance.setReadOnly(fields[i], true);
    }
  });

}
