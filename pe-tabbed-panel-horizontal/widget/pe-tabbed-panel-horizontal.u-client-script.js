function TabbedPanelHorizontalController($timeout) {
    /* widget controller */
    var tph = this;

    $timeout(function() {
        /* Set the conditions for not showing the sub-cards and niblets */
        tph.showBtmCard = new Array(tph.data.cards.length);
        tph.nib = new Array(tph.data.cards.length);

        for (var x = 0; x < tph.showBtmCard.length; x++) {
            tph.showBtmCard[x] = new Array(tph.data.cards[x].tabs.length);
            tph.nib[x] = new Array(tph.data.cards.length);
            for (var y = 0; y < tph.showBtmCard[x].length; y++) {
                tph.showBtmCard[x][y] = 0;
                tph.nib[x][y] = 0;
            }
        }

        /* Need to make sure the niblets are at the bottom of the tab's cells */
        var result = document.getElementsByClassName("tph-innercard-tabs");
        var divHeight = result[0].offsetHeight;
        for (var i = 1; i < result.length; i++) {
            if (divHeight < result[i].offsetHeight) {
                divHeight = result[i].offsetHeight;
            }
        }
        for (var i = 0; i < result.length; i++) {
            angular.element(result[i]).css('height', divHeight);
        }
    });

    tph.showPanel = function(item, tab, status) {
        if (tph.showBtmCard[item.cardIndex][tab.tabIndex] === 1) {
            tph.showBtmCard[item.cardIndex][tab.tabIndex] = 0;
            tph.nib[item.cardIndex][tab.tabIndex] = 0;
        } else {
            for (var x = 0; x < tph.showBtmCard.length; x++) {
                for (var y = 0; y < tph.showBtmCard[x].length; y++) {
                    tph.showBtmCard[x][y] = 0;
                    tph.nib[x][y] = 0;
                }
            }
            tph.showBtmCard[item.cardIndex][tab.tabIndex] = 1;
            tph.nib[item.cardIndex][tab.tabIndex] = 1;
        }
    }
}