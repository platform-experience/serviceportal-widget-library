(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    function($scope, $window) {
        /* widget controller */
        var c = this;

        c.status = {
            name: "Abnormally High Response Times",
            number: "ALT3690",
            probability: 78,
            createdAgo: "2m",
            bu: "Retail POS"
        }

        $rootScope.$on('recovered', function(event, data) {
            c.recovered = true;
            $window.scrollTo(0, 0);
        });

    }
})();