(function() {
  input = input || {};
  data.sys_id = options.sys_id || input.sys_id || $sp.getParameter("sys_id");
  options.modal = options.modal || input.modal || false;
  data.url = "";
  if (!data.sys_id) return;
  var gr = new GlideRecord("sys_attachment");
  if (gr.get(data.sys_id)) {
    data.url = "/sys_attachment.do?view=true&sys_id=" + data.sys_id;
  }
})();
