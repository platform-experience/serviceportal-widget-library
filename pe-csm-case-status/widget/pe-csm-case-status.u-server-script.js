(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    var caseGr = new GlideRecord('sn_customerservice_case');
    caseGr.addQuery('sys_id', options.case_sysid);
    caseGr.query();
    if (caseGr.next()) {

        var caseObj = {};
        $sp.getRecordElements(caseObj, caseGr, 'priority,short_description');

        var slaGr = new GlideRecord('task_sla');
        slaGr.addQuery('task', options.case_sysid);
        slaGr.query();
        if (slaGr.next()) {
            var obj = {};
            $sp.getRecordElements(obj, slaGr, 'sla,stage,schedule');
            caseObj.sla = obj;
            // console.log(obj);
        }
        data.caseObj = caseObj;


    }
})();