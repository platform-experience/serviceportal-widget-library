function($scope) {
    /* widget controller */
    var c = this;

    /*Check if signaute is done*/
    c.done = function() {
        var signature = $scope.accept();
        if (signature.isEmpty) {
            console.log("scratch pad empty");
        } else {
            console.log(signature.dataUrl);
        }
    }
}
