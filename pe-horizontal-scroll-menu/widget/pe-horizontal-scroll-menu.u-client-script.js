function($rootScope, $timeout) {
    /* widget controller */
    var c = this;
    $rootScope.$broadcast('changeBackState', '');
    c.selectedProvider = "all";
    c.changeDataForAll = function () {

    };

    c.changeDataForSelection = function (input) {

    };

    c.switchIt = function (option) {
        if (option == 'all') {
            c.selectedProvider = "all";
            c.changeDataForAll();
        }
        if (option != "all") {
            c.selectedProvider = option;
            c.changeDataForSelection(option);
        }
    };
}
