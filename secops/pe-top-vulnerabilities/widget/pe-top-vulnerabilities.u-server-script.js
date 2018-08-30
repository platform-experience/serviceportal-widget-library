(function() {
  data.vulns = [];
  var vulnCount = 0;
  var gdt = new GlideDateTime();
  var vulnGR = new GlideRecord('sn_vul_nvd_entry');
  vulnGR.addQuery('id', 'CONTAINS', gdt.getYearLocalTime());
  vulnGR.orderByDesc('score');
  vulnGR.query();
  while (vulnGR.next() && vulnCount <= 5) {
    var vulnItemGA = new GlideAggregate('sn_vul_vulnerable_item');
    vulnItemGA.addAggregate('COUNT');
    vulnItemGA.addQuery('vulnerability', vulnGR.sys_id.toString());
    vulnItemGA.query();
    if (vulnItemGA.next()) {
      var risk = parseInt(vulnItemGA.getAggregate('COUNT').toString());
      if (risk !== 0) {
        vulnCount++;
        data.vulns.push({
          risk: risk,
          cvss: parseFloat(vulnGR.score.toString()),
          cve: vulnGR.id.toString(),
          url: vulnGR.sys_id.toString()
        });
      }
    }
  }
})();
