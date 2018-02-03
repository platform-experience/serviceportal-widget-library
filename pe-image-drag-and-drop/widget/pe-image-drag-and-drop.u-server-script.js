(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  data.file = {};
  data.table = options.table;
  data.field_name = options.field_name;

  if (input) {
    if (input.action == 'insert') {
      data.file.name = Math.floor(Date.now() / 1000) + '-' + input.name;
      data.file.type = input.type;
      data.file.image = input.image;
      data.file.uuid = input.uuid;

      if (data.file.name && data.file.type && data.file.image) {
        var gr = new GlideRecord(data.table);
        gr.initialize();
        gr[data.field_name] = data.file.name;
        var newSysid = gr.insert();

        var stringUtil = new GlideStringUtil();
        var attachment = new Attachment();
        var dataImage = stringUtil.base64DecodeAsBytes(data.file.image);
        var attachment_sys_id = attachment.write(
          data.table,
          newSysid,
          data.file.name,
          data.file.type,
          dataImage
        );
        data.file.attachment_sys_id = attachment_sys_id;
        data.file.sys_id = newSysid;

        data.files.push(data.file);
      }
    }

    if (input.action == 'remove') {
      var grDel = new GlideRecord(data.table);
      grDel.addQuery('sys_id', input.file.sys_id);
      grDel.query();
      while (grDel.next()) {
        grDel.deleteRecord();
      }
    }
  }
})();
