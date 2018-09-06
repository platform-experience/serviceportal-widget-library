(function process(g_request, g_response, g_processor) {
	var recordID = g_request.getParameter("record_id").toString();
	var tableName = g_request.getParameter("table_name").toString();
	var attachmentsIDs = g_request.getParameter("attachments").toString();
	var attachmentScript = new x_snc_ec_attach.AttachmentEmailScripts(recordID, tableName);
	var attachments = attachmentScript.getAttachments(attachmentsIDs == "all" ? false : attachmentsIDs.split(","));
	
	var url = attachmentScript.getEmailClientURL(attachments);
	g_processor.redirect(url);
})(g_request, g_response, g_processor);