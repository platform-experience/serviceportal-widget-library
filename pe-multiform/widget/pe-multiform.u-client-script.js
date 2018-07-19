function PiMultiFormCtrl ($scope, PiMfManager, $timeout, $location, nowAttachmentHandler, spUtil, PiMfUpload) {

  'use strict';

  var c = this;

  var formState = [];

  c.submit = submit;
  c.add = add;
  c.canAdd = canAdd;

  c.next = PiMfManager.nextScreen;
  c.previous = PiMfManager.prevScreen;
  c.getCurrentScreenTitle = PiMfManager.getCurrentScreenTitle;
  c.getCurrentScreen = PiMfManager.getCurrentScreen;
  c.goToScreen = PiMfManager.goToScreen;
  c.isLast = PiMfManager.isLast;
  c.isFirst = PiMfManager.isFirst;
  c.isChildCompleted = PiMfManager.isChildCompleted;
  c.childHasMandatory = PiMfManager.childHasMandatory;
  c.getScreenCount = PiMfManager.getScreenCount;
  c.addChildModel = PiMfManager.addChildModel;
  c.getMasterPrimaryAction = PiMfManager.getMasterPrimaryAction;

  c.$onInit = function () {

    /* If there were no errors... */
    c.loading = c.data.errorMessages.length === 0;

    /* ... and thus we're loading */
    if (c.loading && c.data.isValid) {

      /* create the payload */
      var payload = {
        action: 'get_data',
        table: c.data.table,
        sysId: c.data.sysId,
        view: c.data.view
      }

      /* and send it to the server */
      c.server.get(payload).then(function (r) {

        /* Crucial 2 variables used by the widget */
        c.data.form = r.data.form;
        c.data.mf = r.data.mf;

        PiMfUpload.init(r.data.form.table, r.data.form._attachmentGUID);

        /* Register an onChange function with PiMfManager to re-evaluate
                 * which children to show in the various sections based on the
                 * screen we've just changed to. */
        PiMfManager.addOnScreenChangeFunc(function () {
          c.childrenToShow = PiMfManager.getChildrenToShow();
        });
      });
    }
  };


  /** Capture the GlideForm of the master when it's emitted from spModel */
  $scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {

    if (gFormInstance.getTableName() == c.data.table && gFormInstance.getUniqueValue() == c.data.sysId){

      c.loading = false;

      PiMfManager.init(c.data.form, gFormInstance, c.data.mf);

      /* Setup attachment handler */
      $scope.attachmentHandler = new nowAttachmentHandler(function appendDone () {
        $scope.$broadcast("sp.attachments.update", c.data.form._attachmentGUID);
      }, function appendError () {
        /* $scope.errorMessages.push(error); */
        /* spUtil.addErrorMessage(error.msg + error.fileName); */
      });
      $scope.$evalAsync(function() {
        $scope.attachmentHandler.setParams(c.data.form.table, c.data.form._attachmentGUID, 1024 * 1024 * 1024);
      });


    }
  });

  /** Save all forms on the page */
  function submit () {
    PiMfManager.save($scope).then(function (sysId) {
      $location.search({
        'id': c.options.success_page,
        'table': c.options.table,
        'sys_id': sysId
      });
    }, function (incomplete) {

    });
  }

  function canAdd(child) {
    if (child.maxChildRecords) {
      if (child.formModels.length < child.maxChildRecords) {
        return true;
      }
      return false;
    }

    return true;


  }

  /**
     * Add a new child form
     * @param {String} child  The SysID of the Multiform Child
     */
  function add (child) {
    c.server.get({
      action: 'new_form',
      childId: child.sysId
    }).then(function (r) {
      child.formModels.push(r.data.form);
    });
  }
}