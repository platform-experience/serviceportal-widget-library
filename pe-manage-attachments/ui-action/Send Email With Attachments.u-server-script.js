function sendInfoToProcessor(){
	var url = new GlideURL("x_snc_ec_attach_send_email.do");
	url.addParam("record_id",g_form.getUniqueValue());
	url.addParam("table_name","incident");
	url.addParam("attachments","all");
	popupOpenEmailClient(url.getURL());
}