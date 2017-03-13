(function() {
    'use strict';

    function timelineService() {
        var service = {
            getInitialEvents: getInitialEvents
        };
        return service;

        function getInitialEvents() {


            var timeLineData = {
                show: 2,
                header: {
                    text: "Suzy Ham",
                    color: "#a7a7a7",
                    remaining: 2,
                    userPic: "eb16d7c713453a007e94fc5ed144b055.iix"
                },
                timelineArray: [{
                        state: "good",
                        title: "Confirm return"


                    }, {
                        state: "good",
                        title: "Sign LOA Agreement",
                        signature: true

                    },
                    {
                        state: "attention",
                        title: "Reactivate Badge",
                        attenText: "Escalated",
                        attenSubText: "Reactivate badge on 12/8 ",
                        dept: "IT",
                        contact: "Bill Woods"
                    }
                ]
            };
            return timeLineData;
        }
    }

    angular
        .module('pe-timeline-emp-exp')
        .service('timelineService', timelineService);
})();