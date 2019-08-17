(function() {
	data.sys_id = (input && input.sys_id) || options.record_id || $sp.getParameter("sys_id");
	data.table = (input && input.table) || options.record_table || $sp.getParameter("table");
	data.table = _getActualTable(data.table, data.sys_id);
	data.maxAttachmentSize = parseInt(gs.getProperty("com.glide.attachment.max_size", 1024));
	if (isNaN(data.maxAttachmentSize))
		data.maxAttachmentSize = 24;
	data.largeAttachmentMsg = gs.getMessage("Attached files must be smaller than {0} - please try again", "" + data.maxAttachmentSize + "MB");
	data.attachmentSuccessMsg = gs.getMessage("Attachment successfully uploaded");
	
	if (!data.table || !data.sys_id)
		return;

	var gr = new GlideRecord(data.table);
	if (!gr.isValid())
		return;
	
	if (!gr.get(data.sys_id))
		return;

	if (input && input.action == "deleted") {
		gr.comments = input.action + " an attachment";
		gr.update();
	}

	data.canWrite = gr.canWrite();
	data.canAttach = gs.hasRole(gs.getProperty("glide.attachment.role"));
	data.canRead = gr.canRead();

	function _getActualTable(table, id) {
		if (!table)
			return table;
		
		var rec = new GlideRecord(table);
		if (!rec.isValid())
			return table;
		
		if (rec.get(id) && rec.getValue('sys_class_name')) {
			return rec.getValue('sys_class_name');
		}
		return table;
	}
})();