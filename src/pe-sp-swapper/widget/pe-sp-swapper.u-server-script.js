(function() {
  input = input || {};
  options.portals =
    input.portals ||
    options.portals ||
    gs.getProperty("x_pisn_sp_swapper.portals");
  data.portals = [];

  if (!options.portals) return;

  var gr = new GlideRecord("sp_portal");
  gr.addQuery("sys_id", "IN", options.portals);
  gr.query();
  while (gr.next()) {
    data.portals.push({
      sys_id: gr.getUniqueValue(),
      title: gr.getDisplayValue("title"),
      url_suffix: gr.getDisplayValue("url_suffix"),
      logo: gr.getDisplayValue("logo"),
      homepage: gr.getDisplayValue("homepage")
    });
  }
})();
