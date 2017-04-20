(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    if (options.case_sys_id) {
        var caseGr = new GlideRecord('sn_customerservice_case');
        caseGr.addQuery('sys_id', options.case_sys_id);
        caseGr.query();
        if (caseGr.next()) {
            //console.log(options.case_sys_id);
            var caseObj = {};
            $sp.getRecordElements(caseObj, caseGr, 'priority,short_description,account');

            if (caseObj.account.value) {
                var relatedGr = new GlideRecord('sn_customerservice_case');
                relatedGr.addQuery('account', caseObj.account.value);
                relatedGr.query();
                caseObj.relatedCasesCount = relatedGr.getRowCount();
            }
            caseObj.caseCost = '$56.4k';

            var slaGr = new GlideRecord('task_sla');
            slaGr.addQuery('task', options.case_sys_id);
            slaGr.query();
            if (slaGr.next()) {
                var obj = {};
                $sp.getRecordElements(obj, slaGr, 'sla,stage,schedule');
                caseObj.sla = obj;
                // console.log(obj);
            }
            data.caseObj = caseObj;
            // console.log(caseObj);

        }
    }
})();