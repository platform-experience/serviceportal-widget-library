function($scope) {
    //Client script
    var c = this;
    
    c.call = function(telnumber) {
        if (telnumber) {
            window.location.href = "tel://" + telnumber;
        } 
    };
}
