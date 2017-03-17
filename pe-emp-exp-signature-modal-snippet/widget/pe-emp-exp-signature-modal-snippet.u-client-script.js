function SignatureModalHeaderController(spUtil) {
    /* widget controller */
    var c = this;

    c.getCompleteStyleOne = getCompleteStyleOne;
    c.getCompleteStyleTwo = getCompleteStyleTwo;

    spUtil.get('pe-scratch-pad', {

    }).then(function(response) {
        c.data.embedded_widget = response;
    });

    c.$onInit = function() {
        c.yesterday = moment(new Date()).subtract(1, 'days').date();
        c.yestedaymonth = moment(new Date()).subtract(1, 'days').format("MMM");
        c.documentUser = "Suzy Ham";
        c.title = "TAX DOCUMENT";
        c.sub_title = "RELOCATION";
    };

    function getCompleteStyleOne(type) {
        if (type == 'complete') {
            return {
                "background": "#fff",
                "clip": "rect(0 40px 22px 0)",
                "transform": "rotate(90deg)",
                "border-radius": "50%"

            };
        }

    };

    function getCompleteStyleTwo(deg) {
        return {
            "background": "#fff",
            "clip": "rect(0 20px 40px 0)",
            "transform": "rotate(" + deg + "deg)",
            "border-radius": "50%"


        }
    };

}