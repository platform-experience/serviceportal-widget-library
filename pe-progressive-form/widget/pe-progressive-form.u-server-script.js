(function($sp) {

  var widgetInstance = $sp.getValue("sys_id");
  var view = options.view || 'service_portal';

  /**
   * Ensure we've been supplied with all the necessary options for the widget to work
   */

  data.mandatoryErrors = 0;

  if (!options.master)
    showMandatoryError("master");

  if (!options.child)
    showMandatoryError("child");

  if (!options.reference)
    showMandatoryError("reference");

  if (data.mandatoryErrors > 0)
    return false;

  function showMandatoryError (fieldName) {
    gs.addErrorMessage(gs.getMessage('Mandatory field "{0}" not set for instance "{1}".', [fieldName, widgetInstance]));
    data.mandatoryErrors++;
  }

  if (input) {
    data.sysId = input.sysId;
  } else {
    data.sysId = $sp.getParameter("sys_id") || '-1';
  }

  data.messages = [];
  data.messages.push({
    name: 'Please complete all mandatory fields before submitting',
    value: gs.getMessage('Please complete all mandatory fields before submitting')
  });


  /**
   * Get the actual table names (the reference fields in the options will be the sysId of a 'sys_db_object' record)
   */

  var master = new GlideRecord('sys_db_object');
  master.get(options.master);

  var child  = new GlideRecord('sys_db_object');
  child.get(options.child);


  /**
   * Maybe we're just requesting a single child form?
   */

  if (input && input.action === 'get_child_form') {
    input.view = input.view || view;
    data.form = $sp.getForm(child.getValue('name'), '-1', null, input.view);
    return;
  }


  /**
   * Get the progressive form model from the script include
   */

  var pfh = new PeProgressiveFormHelper($sp);
  pfh.setMaster(master.getValue('name'));
  pfh.setView(view);
  pfh.setChild(child.getValue('name'), options.reference);
  data.forms = pfh.get(data.sysId);

})($sp);