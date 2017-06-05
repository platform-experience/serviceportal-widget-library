(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    data.schema = {
        case_table: options.case_table,
        sla_table: options.sla_table,
        case_id: options.case_sys_id,
        caseGr: new GlideRecord(options.case_table),
        slaGr: new GlideRecord(options.sla_table),
        showMsg: true,
        grMsg: "Case Table reference not provided or invalid."
    };

    //Check to see if the user provided a valid table? 
    if (data.schema.case_table && data.schema.caseGr.isValid()) {
        //Check to see if the user provided a Case ID
        if (data.schema.case_id) {
            data.schema.caseGr.addQuery('sys_id', data.schema.case_id);
            data.schema.caseGr.query();

            //Did the Case ID produce results?
            if (data.schema.caseGr.next()) {
                data.schema.showMsg = false;
                var caseObj = {};

                $sp.getRecordElements(caseObj, data.schema.caseGr, 'priority,short_description');

                if (data.schema.sla_table && data.schema.slaGr.isValid()) {
                    data.schema.slaGr.addQuery('task', data.schema.case_id);
                    data.schema.slaGr.query();
                    if (data.schema.slaGr.next()) {
                        var obj = {};
                        $sp.getRecordElements(obj, data.schema.slaGr, 'sla,stage,schedule');
                        caseObj.sla = obj;
                    }
                } else {
                    caseObj.sla = {
                        sla: '',
                        stage: '',
                        schedule: ''
                    };
                }

                data.caseObj = caseObj;

            } else {
                data.schema.grMsg = "Data query for Case ID: '" + data.schema.case_id + "' produced zero (0) results."
            }
        } else {
            data.schema.grMsg = "Case ID reference not provided."
        }
    }
})();