function csmProgressBarCtrl() {
    /* widget controller */
    var c = this;

    c.getStyle = function(total, actual, bgcolor) {
        return { 'width': (actual / total * 100) + "%", "background-color": bgcolor };
        // return "{'width':" + (actual / total * 100) + "%}";
    }
}