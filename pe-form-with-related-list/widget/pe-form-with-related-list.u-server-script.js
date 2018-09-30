// form functionality - URL parameter driven
(function ($sp, input, data, options, gs) {
  /* "use strict"; -linter issues */
  // populate the 'data' variable
  data.attachmentUploadSuccessMsg = gs.getMessage("Attachment upload was successful");
  data.recordAddedMsg = gs.getMessage("Record Added");
  data.updatedMsg = gs.getMessage("updated_uppercase");
  data.exportPDFMsg = gs.getMessage("Export to PDF");
  data.exportPDFLandMsg = gs.getMessage("Export to PDF (landscape)");
  data.addAttachmentMsg = gs.getMessage("Add an attachment");
  data.maxAttachmentSize = parseInt(gs.getProperty("com.glide.attachment.max_size", 1024));
  if (isNaN(data.maxAttachmentSize))
      data.maxAttachmentSize = 24;
  data.largeAttachmentMsg = gs.getMessage("Attached files must be smaller than {0} - please try again", "" + data.maxAttachmentSize + "MB");
  data.attachmentSuccessMsg = gs.getMessage("Attachment successfully uploaded");

  data.isAdmin = gs.hasRightsTo('sp/configure.all/execute', null);
  data.emptyStateTemplate = options.empty_state_template;
  data.disableUIActions = options.disableUIActions === "true";
  data.hideRelatedLists = options.hideRelatedLists || false;

  if (input) {
      data.table = input.table;
      data.sys_id = input.sys_id;
      data.view = input.view;
      var result = {};
      if (input._fields) {
          result = $sp.saveRecord(input.table, input.sys_id, input._fields);
          data.sys_id = result.sys_id;
      }

      if (input.sys_id == '-1')
          data.isNewRecord = true;
  } else {
      data.table = options.table || $sp.getParameter("t") || $sp.getParameter("table") || $sp.getParameter("sl_table");
      data.sys_id = options.sys_id || $sp.getParameter("sys_id") || $sp.getParameter("sl_sys_id");
      data.view = options.view || $sp.getParameter("view") || $sp.getParameter("v"); // no default
  }

  data.query = $sp.getParameter("query") || options.query || "";
  data.f = {};
  if (!data.table)
      return;

  // Form widget is not a supported way to view an attachment
  if (data.table == "sys_attachment") {
      data.tableUnsupported = true;
      return;
  }

  if (!GlideTableDescriptor.isValid(data.table))
      return;

  if (!data.sys_id)
      return;

  var rec = $sp.getRecord(data.table, data.sys_id);
  data.isValid = rec.isValid() || data.sys_id == "-1";
  if (!data.isValid)
      return;

  data.table = rec.getRecordClassName();
  data.tableHierarchy = GlideDBObjectManager.getTables(data.table).toArray().join();
  data.canWrite = rec.canWrite();
  var hasRecordAccess = data.sys_id == "-1" ? rec.canCreate() : data.canWrite;
  data.canAttach = hasRecordAccess && gs.hasRole(gs.getProperty('glide.attachment.role')) && !GlideTableDescriptor.get(data.table).getED().getBooleanAttribute("no_attachment");
  data.f = $sp.getForm(data.table, data.sys_id, data.query, data.view);

  // Activity formatter is hardcoded to set specific options
  for (var f in data.f._formatters) {
      var fm = data.f._formatters[f];
      if (fm.formatter == "activity.xml") {
          fm.hardcoded = true;
          fm.widgetInstance = $sp.getWidget('widget-ticket-conversation',
              {
                  table: data.table,
                  sys_id: data.sys_id,
                  includeExtended: true,
                  title: "${Activity}",
                  use_dynamic_placeholder: true,
                  btnLabel: "${Post}"
              });
      } else if (fm.formatter == "com_glideapp_servicecatalog_veditor" || fm.formatter == "com_glideapp_questionset_default_question_editor") {
          var qsConfig = $sp.getValue('quick_start_config');
          if (qsConfig)
              qsConfig = JSON.parse(qsConfig)[0];
          fm.widgetInstance = $sp.getWidget(fm.widget, {
              table: data.table,
              sys_id: data.sys_id,
              readonly_variable_editor: qsConfig ? qsConfig.readonly_variable_editor : 'false'
          });
      } else
          fm.widgetInstance = $sp.getWidget(fm.widget, data);
  }

  data.relatedListWidget = $sp.getWidget('related-list', {
      table: data.table,
      sys_id: data.sys_id,
      inline_editing: options.inline_editing == "true"
  });
})($sp, input, data, options, gs);
