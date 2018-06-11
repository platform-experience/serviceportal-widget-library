(function() {
  data.task = {};
  data.user_id = gs.getUserID();
  data.user_name = gs.getUserName();
  data.title = $sp.getValue('title');
  data.short_description = $sp.getValue('short_description');

  if (input) {data.sys_id = input.sys_id;}
  else if (options) {data.sys_id = options.sys_id;}
  else {data.sys_id = $sp.getValue('sys_id');}

  var hrtt = new hr_TaskTicket();
  if (input && input.action === 'setTaskSkipped') {hrtt.setTaskSkipped(input.request);}
  data.task = hrtt.getTasks(data.sys_id);

  if (data.task.hasDraftDoc && data.task.assigned_to_me) {
    data.attachmentInfo = hrtt.getTaskAttachment(data.sys_id);

    // get the case from the task, retrieve from case whether pdf_template has a valid document revision
    data.isPdfTemplate = false;
    data.pdfTemplateSysId = '';
    isPdfTemplate(data.sys_id);

    data.documentBody = '';
    if (data.isPdfTemplate) {
      var previewPdfSysId = new sn_hr_core.hr_PdfUtils().prefillPdf(
        data.pdfTemplateSysId,
        false,
        data.sys_id,
        'sn_hr_core_task',
        data.sys_id
      );
      var attachment = new GlideRecord('sys_attachment');
      attachment.get(previewPdfSysId);
      data.attachmentUrl = '/sys_attachment.do?view=true&sys_id=' + attachment.getUniqueValue();
    } else {data.documentBody = hrtt.getDocumentBody(data.sys_id);}

    if (input && input.action === 'setDocumentBody')
    {hrtt.setDocumentBody(data.task.sys_id, data.documentBody);}
  } else if (!data.task.assigned_to_me) {
    if (data.task.finished) {data.completed_by = data.task.assigned_to.name;}
    else {
      if (gs.nil(data.task.assigned_to.userId)) {data.caption = gs.getMessage('Task is unassigned');}
      else {data.caption = gs.getMessage('Task assigned to ' + data.task.assigned_to.name);}
    }
  }

  function isPdfTemplate(sys_id) {
    var task = new GlideRecord('sn_hr_core_task');
    task.get(sys_id);
    if (task.parent.pdf_template) {
      var pdfTemplate = new GlideRecord('sn_hr_core_pdf_template');
      pdfTemplate.get(task.parent.pdf_template);
      if (pdfTemplate.document_revision) {
        data.isPdfTemplate = true;
        data.pdfTemplateSysId = task.parent.pdf_template.sys_id;
      }
    }
  }
})();
