(function() {
  data.vi = {
    TOTAL : 0,
    stats : [{
      TOTAL : 0,
      LOCAL : 0,
      ADJACENT_NETWORK : 0,
      NETWORK : 0
    },{
      TOTAL : 0,
      LOCAL : 0,
      ADJACENT_NETWORK : 0,
      NETWORK : 0
    },{
      TOTAL : 0,
      LOCAL : 0,
      ADJACENT_NETWORK : 0,
      NETWORK : 0
    }]
  };
  getCount(0);
  getCount(1);
  getCount(2);
  function getCount(index){
    index = index || 0;
    var query = index === 2 ? "risk_score<=33" : (index === 1 ? "risk_score>33^risk_score<66" : "risk_score>=66");
    var viGA = new GlideAggregate("sn_vul_vulnerable_item");
    viGA.addAggregate("COUNT");
    viGA.addEncodedQuery(query);
    viGA.groupBy("vulnerability.access_vector");
    viGA.query();
    while(viGA.next()){
      var accessVector = viGA.getValue("vulnerability.access_vector");
      var count = parseInt(viGA.getAggregate("COUNT"))
      data.vi.TOTAL += count;
      data.vi.stats[index].TOTAL += count;
      data.vi.stats[index][accessVector] += count;
    }
  }
  data.chart = $sp.getWidget("secops-pie-chart", {
    low : data.vi.stats[0].TOTAL,
    high : data.vi.stats[1].TOTAL,
    medium : data.vi.stats[2].TOTAL
  });
})();