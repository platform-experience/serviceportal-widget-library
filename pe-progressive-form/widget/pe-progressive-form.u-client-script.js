function peProgressiveForm (peConcertinaManager, peFormManager, $scope, $location, i18n) {

  var c = this;

  if (c.data.mandatoryErrors === 0) {

    c.data.messages.forEach(function (message) {
      i18n.loadMessage(message.name, message.value);

    });

    c.forms = {
      master: [c.data.forms.master],
      children: c.data.forms.children
    };

    peFormManager.setActionName('delete', c.options.delete_action_name);
    peFormManager.setActionName('insert', c.options.insert_action_name);
    peFormManager.setActionName('update', c.options.update_action_name);

    peFormManager.setReference('problem_id');

    if (c.data.sysId !== '-1') {
      peConcertinaManager.unlock('main');
    }

    peConcertinaManager.unlock('child');

    /**
     * Add a new child form
     */
    c.addChild = function () {
      c.server.get({action: 'get_child_form', view: c.forms.master.view}).then(function(r) {
        c.forms.children.forms.push(r.data.form);
      });
    };

    /**
     * Save all forms on the page
     */
    c.save = function () {
      peConcertinaManager.closeAll('main');

      peFormManager.save().then(function (sysId) {

        if (c.options.redirect_to === '') {

          $location.search('sys_id', sysId);

          c.data.sysId = sysId;

          c.server.update().then(function () {

            peFormManager.reset();

            c.forms.children = [];
            c.forms.master = [];

            c.forms.master = [c.data.forms.master];
            c.forms.children = c.data.forms.children;

          });

        } else {
          var search = $location.search();
          search.id = c.options.redirect_to;
          search.pf_table = c.forms.master[0].table;
          search.pf_id = sysId;
          search.sys_id = undefined;
          $location.search(search).replace();
        }
      });
    };
  }
}