function($rootScope, $timeout) {
    /* widget controller */
    var c = this;
    c.graphdata = {};
    $rootScope.title = "Cloud Dashboard"


    $rootScope.$broadcast('changeBackState', '');

    c.selectedProvider = "all";
    c.vmsData = {
        filter:'all',
        donut_data: {
            total: 100,
            completed: 85,
            display_value: "21%",
            sub_title: "NONCOMPLIANT spend",
            bottom_text: "$50k UNACCOUNTED"
        },
        second_box: {
            top_text: "savings",
            middle_text: "$69k",
            sub_title: "47 RECLAIMED VMs"
        },
        third_box: {
            big_text: "78%",
            sub_title: "UTILIZATION RATE",
            sub_sub_title: "3% M/M"

        }

    };
    c.allgraphdata = {
        widget_heading: "cloud budget",

        left_info: {
            icon: "dollar-bag.png",
            number: "$230K",
            number_text: "Spent"

        },


        right_info: {

            type: "bar",
            bar_title: "5 days to $0",
            remaining: 46,
            total: 276
        },
        card_header: "budget requests",
        approvals: [
           
            {

                title: "Budget Request",
                sub_title: "Engineering",
                attention_text: "Tier 1",
                attention_icon: "fa-exclamation-circle",
                big_text: "$25k",
                state: "pending",
                //big_text_icon: "fa-money"
                big_text_icon: "coins.png"
            }

        ],

        graph_numbers: [{
                color: "#132347",
                width: "60%",
                info_text: "AWS"
                    //info_number: "14"
            }, {
                color: "#1c5b7d",
                width: "20%",
                info_text: "AZURE"
                    //info_number: "12"
            }, {
                color: "#96c6c8",
                width: "20%",
                info_text: "VMW"
                    //info_number: "14"
            }

        ]


    };
    c.allgraphdata_services = {
        widget_heading: "cloud services",
        filter: "all",
        whereto: "services",
        target_line: {
            exists: true,
            target: "75%"

        },
        left_info: {
            icon: "services_logo.png",
            number: "150",
            number_text: "cloud services"

        },

        right_info: {
            icon: "",
            number: "20%",
            number_text: "increase in public cloud consumption",
            color: "green"
        },
        approvals: [
          

        ],

        graph_numbers: [{
                color: "#678C8D",
                width: "50%",
                info_text: "Public",
                over_text: "25% PENDING"

                //info_number: "20"
            }, {
                color: "#7D8A91",
                width: "50%",
                info_text: "Private"
                    //info_number: "10"
            }, {
                color: "#2E5E5E",
                width: "0%",
                info_text: ""
                    //info_number: "20"
            }

        ]


    };



    c.graphdata = c.allgraphdata;
    c.approvals = c.allgraphdata.approvals;
    c.graphdata_services = c.allgraphdata_services;
    c.graphdata_incidents = c.allgraphdata_incident;

    c.awsgraphdata = {
        filter: "aws",
        left_info: {
            icon: "dollar-bag.png",
            number: "$23K",
            number_text: "TCO Savings"

        },

        right_info: {
            icon: "fa-shield",
            number: "$23K",
            number_text: "Savings",
            color: "green"
        },
        approvals: [{

                title: "Budget Request",
                sub_title: "vm15 Engineering",
                attention_text: "Some text",
                attention_icon: "fa-exclamation-circle",
                big_text: "$250k",
                state: "pending",
                big_text_icon: "fa-money"
            }, {

                title: "Bada boom",
                sub_title: "testing testing",
                attention_text: "Some text",
                attention_icon: "fa-exclamation-circle",
                big_text: "$750k",
                state: "pending",
                big_text_icon: "fa-bell"
            }

        ],



        graph_numbers: [{
                color: "#678C8D",
                width: "25%",
                info_text: "new"
                    //info_number: "7"
            }, {
                color: "#2E5E5E",
                width: "50%",
                info_text: "active",
                info_number: "10"
            }, {
                color: "#7D8A91",
                width: "25%",
                info_text: "pending",
                info_number: "15"
            }

        ]


    };



   



    c.changeDataForAll = function() {

        c.approvals = c.allgraphdata.approvals;
        c.graphdata.left_info.number = "$230k";
        c.vmsData.filter = "all",

        c.graphdata.right_info.total = 276;
        c.graphdata.right_info.remaining = 46;
        c.graphdata.graph_numbers[0].info_text = "AWS";
        c.graphdata.graph_numbers[1].info_text = "AZURE";
        c.graphdata.graph_numbers[2].info_text = "VMWARE";
        c.graphdata.graph_numbers[0].info_number = "14";
        c.graphdata.graph_numbers[1].info_number = "12";
        c.graphdata.graph_numbers[2].info_number = "14";
        c.graphdata.graph_numbers[0].width = "60%";
        c.graphdata.graph_numbers[1].width = "20%";
        c.graphdata.graph_numbers[2].width = "20%";

        //debugger;
        //console.log(c.approvals);

        c.graphdata_services.filter = "all";
        c.graphdata_services.left_info.number = "150";
        c.graphdata_services.right_info.number = "20%";
        c.graphdata_services.graph_numbers[0].info_text = "Public";
        c.graphdata_services.graph_numbers[1].info_text = "Private";
        c.graphdata_services.graph_numbers[2].info_text = "";
        c.graphdata.graph_numbers[0].info_number = "20";
        c.graphdata.graph_numbers[1].info_number = "10";
        c.graphdata.graph_numbers[2].info_number = "20";
        c.graphdata_services.graph_numbers[0].width = "50%";
        c.graphdata_services.graph_numbers[1].width = "50%";
        c.graphdata_services.graph_numbers[2].width = "0%";


        c.vmsData.donut_data.total = 100;
        c.vmsData.donut_data.completed = 85;
        c.vmsData.donut_data.display_value = "21%";
        c.vmsData.donut_data.sub_title = "NONCOMPLIANT spend";
        c.vmsData.donut_data.bottom_text = "$50k UNACCOUNTED";

        c.vmsData.second_box.top_text = "savings";
        c.vmsData.second_box.middle_text = "$69k";
        c.vmsData.second_box.sub_title = "47 RECLAIMED VMs";

        c.vmsData.third_box.big_text = "78%";
        c.vmsData.third_box.sub_title = "UTILIZATION RATE";
        c.vmsData.third_box.sub_sub_title = "3% M/M";

    };
    c.changeDataForAws = function() {
        c.vmsData.filter = "aws";
        c.graphdata_services.filter = "aws";
        c.approvals = c.awsgraphdata.approvals;
        c.graphdata.left_info.number = "$138k";
        c.graphdata.right_info.total = 165.6;
        c.graphdata.right_info.remaining = 27.6;

        c.graphdata.graph_numbers[0].info_text = "DEV";
        c.graphdata.graph_numbers[1].info_text = "PROD";
        c.graphdata.graph_numbers[2].info_text = "QA";
        c.graphdata.graph_numbers[0].info_number = "10";
        c.graphdata.graph_numbers[1].info_number = "6";
        c.graphdata.graph_numbers[2].info_number = "4";
        c.graphdata.graph_numbers[0].width = "50%";
        c.graphdata.graph_numbers[1].width = "30%";
        c.graphdata.graph_numbers[2].width = "20%";

        c.graphdata_services.left_info.number = "90";
        c.graphdata_services.right_info.number = "20%";

        c.graphdata_services.graph_numbers[0].info_text = "Public";
        c.graphdata_services.graph_numbers[1].info_text = "Private";
        c.graphdata_services.graph_numbers[2].info_text = "";
        //c.graphdata_services.graph_numbers[2].color = "#96C6C8";
        // c.graphdata_services.graph_numbers[0].info_number = "48";
        // c.graphdata_services.graph_numbers[1].info_number = "16";
        // c.graphdata_services.graph_numbers[2].info_number = "16";
        c.graphdata_services.graph_numbers[0].width = "50%";
        c.graphdata_services.graph_numbers[1].width = "50%";
        c.graphdata_services.graph_numbers[2].width = "0%";

        c.vmsData.donut_data.total = 100;
        c.vmsData.donut_data.completed = 90;
        c.vmsData.donut_data.display_value = "21%";
        c.vmsData.donut_data.sub_title = "NONCOMPLIANT spend";
        c.vmsData.donut_data.bottom_text = "$30k UNACCOUNTED";

        c.vmsData.second_box.top_text = "savings";
        c.vmsData.second_box.middle_text = "$41.4k";
        c.vmsData.second_box.sub_title = "28 RECLAIMED VMs";

        c.vmsData.third_box.big_text = "78%";
        c.vmsData.third_box.sub_title = "UTILIZATION RATE";
        c.vmsData.third_box.sub_sub_title = "3% M/M";

        

    };

    c.changeDataForAzure = function() {
        c.vmsData.filter = "azure";
        c.graphdata_services.filter = "azure";
        c.graphdata.left_info.number = "$47k";
        c.graphdata.graph_numbers[0].info_text = "DEV";
        c.graphdata.graph_numbers[1].info_text = "PROD";
        c.graphdata.right_info.total = 55;
        c.graphdata.right_info.remaining = 9.2;
        c.graphdata.graph_numbers[2].info_text = "QA";
        c.graphdata.graph_numbers[0].info_number = "2";
        c.graphdata.graph_numbers[1].info_number = "3";
        // c.graphdata.graph_numbers[2].info_number = "5";
        c.graphdata.graph_numbers[0].width = "40%";
        c.graphdata.graph_numbers[1].width = "10%";
        c.graphdata.graph_numbers[2].width = "50%";

        c.graphdata_services.left_info.number = "30";
        c.graphdata_services.graph_numbers[0].info_text = "Public";
        c.graphdata_services.graph_numbers[1].info_text = "Private";
      
        c.graphdata_services.graph_numbers[0].width = "50%";
        c.graphdata_services.graph_numbers[1].width = "50%";
        //c.graphdata_services.graph_numbers[2].width = "15%";
        c.vmsData.donut_data.total = 100;
        c.vmsData.donut_data.completed = 90;
        c.vmsData.donut_data.display_value = "22%";
        c.vmsData.donut_data.sub_title = "NONCOMPLIANT spend";
        c.vmsData.donut_data.bottom_text = "$10k UNACCOUNTED";

        c.vmsData.second_box.top_text = "savings";
        c.vmsData.second_box.middle_text = "$13.8k";
        c.vmsData.second_box.sub_title = "9 RECLAIMED VMs";

        c.vmsData.third_box.big_text = "78%";
        c.vmsData.third_box.sub_title = "UTILIZATION RATE";
        c.vmsData.third_box.sub_sub_title = "3% M/M";

       
    };

    c.changeDataForVmware = function() {
        c.vmsData.filter = "vmware";
         c.graphdata_services.filter = "vmware";
        c.graphdata.left_info.number = "$47k";
        c.graphdata.graph_numbers[0].info_text = "DEV";
        c.graphdata.graph_numbers[1].info_text = "PROD";
        c.graphdata.right_info.total = 55;
        c.graphdata.right_info.remaining = 9.2;
        c.graphdata.graph_numbers[2].info_text = "QA";
        c.graphdata.graph_numbers[0].info_number = "2";
        c.graphdata.graph_numbers[1].info_number = "3";
        // c.graphdata.graph_numbers[2].info_number = "5";
        c.graphdata.graph_numbers[0].width = "20%";
        c.graphdata.graph_numbers[1].width = "50%";
        c.graphdata.graph_numbers[2].width = "30%";

        c.graphdata_services.left_info.number = "30";
        c.graphdata_services.graph_numbers[0].info_text = "Public";
        c.graphdata_services.graph_numbers[1].info_text = "Private";
        //c.graphdata_services.graph_numbers[2].info_text = "pending";
        // c.graphdata_services.graph_numbers[0].info_number = "20";
        // c.graphdata_services.graph_numbers[1].info_number = "20";
        //c.graphdata_services.graph_numbers[2].info_number = "60";
        c.graphdata_services.graph_numbers[0].width = "50%";
        c.graphdata_services.graph_numbers[1].width = "50%";
        //c.graphdata_services.graph_numbers[2].width = "15%";
        c.vmsData.donut_data.total = 100;
        c.vmsData.donut_data.completed = 90;
        c.vmsData.donut_data.display_value = "21%";
        c.vmsData.donut_data.sub_title = "NONCOMPLIANT spend";
        c.vmsData.donut_data.bottom_text = "$30k UNACCOUNTED";

        c.vmsData.second_box.top_text = "savings";
        c.vmsData.second_box.middle_text = "$13.8k";
        c.vmsData.second_box.sub_title = "9 RECLAIMED VMs";

        c.vmsData.third_box.big_text = "78%";
        c.vmsData.third_box.sub_title = "UTILIZATION RATE";
        c.vmsData.third_box.sub_sub_title = "3% M/M";
        
    };
    c.switchIt = function(option) {
        //debugger;
        if (option == 'all') {
            c.selectedProvider = "all";

            c.changeDataForAll();
        }
        if (option == "aws") {
            //debugger;
            c.selectedProvider = "aws";
            c.changeDataForAws();

        }
        if (option == "azure") {
            c.selectedProvider = "azure";
            c.changeDataForAzure();

        }
        if (option == "vmware") {
            c.selectedProvider = "vmware";
            c.changeDataForVmware();

        }

    };

    

}
