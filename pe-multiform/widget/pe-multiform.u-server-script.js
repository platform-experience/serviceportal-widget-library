(function($sp, input, data, FormModel, options, Multiform, gs, GlideRecord) {

  'use strict';

  if (input && input.action === 'new_form') {

    data.form = new FormModel(input.childId);

    return;

  } else if (input && input.action === 'get_data') {

    data.view = options.view;
    data.sysId = options.record || input.sysId || '-1';
    data.table = options.table;

    data.form = $sp.getForm(data.table, data.sysId, '', data.view);
    data.mf = new Multiform($sp.getDisplayValue('sys_id'));

    return;

  } else {

    data.isValid = true;

    data.table = options.table;
    data.sysId = options.record || $sp.getParameter('sys_id') || '-1';
    data.view = options.view;
    data.maxAttachmentSize = parseInt(gs.getProperty("com.glide.attachment.max_size", 1024));

    var rec = new GlideRecord(data.table);
    rec.get(data.sysId);

    data.errorMessages = [];

    if (!data.sysId) {
      data.isValid = false;
      data.errorMessages.push(gs.getMessage("You provided an invalid SysID"));
    }

    if (!data.view) {
      data.isValid = false;
      data.errorMessages.push(gs.getMessage("No view is set in the widget instance's configuration"));
    }

    if (!data.table) {
      data.isValid = false;
      data.errorMessages.push(gs.getMessage("No table is set in the widget instance's configuration"));
    }

    if (!data.isValid) {
      return;
    }

    if (!rec.isValid() && data.sysId !== '-1') {
      data.isValid = false;
      data.errorMessages.push(gs.getMessage("That record doesn't exist"));
    }

    if (data.sysId === '-1' && !rec.canCreate()) {
      data.isValid = false;
      data.errorMessages.push(gs.getMessage("You can't create records in this table"));
    }

    if (!data.isValid) {
      return;
    }

    data.table = rec.getRecordClassName();
    data.canWrite = rec.canWrite();

    var hasRecordAccess = data.sys_id == "-1" ? rec.canCreate() : data.canWrite;
    data.canAttach = hasRecordAccess && gs.hasRole(gs.getProperty('glide.attachment.role'));
  }

})($sp, input, data, FormModel, options, Multiform, gs, GlideRecord);