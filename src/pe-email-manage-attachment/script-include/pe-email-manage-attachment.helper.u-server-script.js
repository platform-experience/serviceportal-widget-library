var AttachmentEmailUtil = Class.create();
AttachmentEmailUtil.prototype = {
	initialize : function(recordID, tableName) {
		this.recordID = recordID;
		this.tableName = tableName;
		this.recordGR = getRecord(recordID, tableName);
	},

	getEmailClientURL : function(attachments){
		var url = "email_client.do?";
		if(attachments.length != 0){
			var emailID = this.createEmail(attachments);
			url += "sysparm_email_id=" + emailID + "&";
		}
		url += "sysparm_table=" + this.tableName;
		url += "&sysparm_sys_id=" + this.recordID; 
		url += "&sysparm_target=" + this.tableName;
		url += "&sys_target=" + this.tableName;
		url += "&sys_uniqueValue=" + this.recordID;
		url += "&sys_row=0&sysparm_domain_restore=false&sysparm_stack=no";
		return url;
	},
	
	createEmail : function(attachments){
		var emailID = "";
		var replyTo = getReplyTo();
		var templateGR = getTemplateGR(this.tableName);
		var emailGR = new GlideRecord('sys_email');
		emailGR.initialize();
		emailGR.instance = this.recordID;
		emailGR.target_table = this.tableName;
		emailGR.reply_to = replyTo;
		emailGR.user = replyTo;
		emailGR.type = "send-ignored";
		emailGR.error_string = "User did not press the Send button in Email Client";
		emailGR.headers = "X-ServiceNow-Source: EmailClient\nX-ServiceNow-SysEmail-Version: 2";
		emailGR.weight = -1;
		if(templateGR.next()){
			emailGR.recipients = this.regexReplace(templateGR.recipients.toString());
			emailGR.subject = this.regexReplace(templateGR.subject.toString());
			emailGR.blind_copied = this.regexReplace(templateGR.blind_copied.toString());
			emailGR.copied = this.regexReplace(templateGR.copied.toString());
			emailGR.body = this.regexReplace(templateGR.content_type == "text/html" ? templateGR.body_html.toString() : templateGR.body.toString());
		}
		emailID = emailGR.insert();
		if(attachments){
			copyAttachments(emailGR,attachments);
		}
		return emailID;
	},
	
	getAttachments : function(idList){
		gs.log("ID List: " + idList);
		var attachmentList = [];
		var attachmentGR = new GlideRecord("sys_attachment");
		attachmentGR.addQuery("table_sys_id",this.recordID);
		attachmentGR.addQuery("table_name",this.tableName);
		if(idList){
			attachmentGR.addQuery("sys_id","IN",idList);
		}
		attachmentGR.query();
		while(attachmentGR.next()){
			attachmentList.push({
				file_name : attachmentGR.file_name.toString(),
				sys_id : attachmentGR.sys_id.toString(),
				content_type : attachmentGR.content_type.toString(),
				base64 : getAttachmentBase64(attachmentGR),
				selected : true
			});
		}
		gs.log("AttachmentList Length: " + attachmentList.length);
		return attachmentList;
	},
	
	writeAttachmentBase64 : writeAttachmentBase64,
	regexReplace : function (textString){
		var reg = new RegExp(/\${(\w*)}/g);
		var regTest;
		while ((regTest = reg.exec(textString)) !== null) {
			if (regTest.index === reg.lastIndex) {
				reg.lastIndex++;
			}
			textString = textString.replace(regTest[0].toString(),this.recordGR.getDisplayValue(regTest[1].toString()));
		}
		return textString;
	},
	type: 'AttachmentEmailUtil'
};

//Private
function getAttachmentBase64 (attachmentGR){
	var gsa = new GlideSysAttachment();
	var binData = gsa.getBytes(attachmentGR);
	return GlideStringUtil.base64Encode(binData);
}
function writeAttachmentBase64 (emailRecord, attachment, sa64){
	var gsa = new GlideSysAttachment();
	gsa.write(emailRecord,attachment.file_name.toString(),attachment.content_type.toString(),sa64);
}
function getRecord (recordID, tableName){
	var recordGR = new GlideRecord(tableName);
	recordGR.get(recordID);
	return recordGR;
}
function getReplyTo(){
	var replyTo = gs.getProperty("glide.email.username") + " <" + gs.getProperty("glide.cs.email.case_queue_address") + ">"; 
	var emailAccountsGR = new GlideRecord("sys_email_account");
	emailAccountsGR.addQuery("type","smtp");
	emailAccountsGR.addActiveQuery();
	emailAccountsGR.query();
	if(emailAccountsGR.next()){
		replyTo = emailAccountsGR.email_user_label.toString() + " <" +  emailAccountsGR.from.toString() + ">";
	}
	return replyTo;
}

function getTemplateGR(tableName){
	var templateGR = new GlideRecord("sys_email_client_template");
	templateGR.addQuery("name","New Email");
	templateGR.addQuery("table",tableName);
	templateGR.query();
	return templateGR;
}

function copyAttachments(emailRecord, attachments){
	for(var i = 0; i != attachments.length; i++){
		copyAttachment(emailRecord,attachments[i]);
	}
}
function copyAttachment(emailRecord, attachment){
	var sa64 = attachment.base64 || getAttachmentBase64(getRecord(attachment.sys_id.toString(),"sys_attachment"));
	log(sa64);
	writeAttachmentBase64(emailRecord, attachment, sa64);
}
function log(message){
	var gdt = new GlideDateTime();
	gs.info(gdt.getNumericValue() + "\n" + message);
}