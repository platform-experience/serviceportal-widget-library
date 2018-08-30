function RiskDetailsController() {
  var c = this;

  sp.c.$onInit = function() {
    c.cves = getRandomNumber(850, 1000, 1);
    c.active_pane = 1;
  };

  c.getClass = function(index){
    return index === 2 ? "low" : (index === 1 ? "med" : "high");
  };
  c.getTitle = function(index){
    return index === 2 ? "Low" : (index === 1 ? "Med" : "High");
  };
  c.getRedClass = function(index, key){
    if(key === "LOCAL" || index === 2){
      return "light-red";
    }
    if(key === "ADJACENT_NETWORK" || index === 1){
      return "med-red";
    }
    return "dark-red";
  };
  function getRandomNumber (min, max, round) {
    var randomNumber = Math.round((Math.random() * (max - min + 1) + min) / round) * round;
    while(randomNumber > max || randomNumber < min){
      randomNumber = Math.round((Math.random() * (max - min + 1) + min) / round) * round;
    }
    return randomNumber;
  }
}