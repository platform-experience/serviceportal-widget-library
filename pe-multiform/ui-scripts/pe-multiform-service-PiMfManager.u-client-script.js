PiMf.service('PiMfManager', function PiMfManager(
  $q, spUtil, i18n, $location, $rootScope, $timeout) {

  'use strict';

  var master;
  var containers;
  var mfData;

  var masterListener;
  var childListener;

  var children = [];
  var childrenBySection = {};
  var screenChangeFuncs = [];
  var valueChangeFuncs = [];
  var incompleteFieldNames = [];
  var invalidMinMax = [];

  var currentScreen = -1;
  var screenCount = 0;
  var childForms = 0;
  var savedForms = 0;

  var failure, success;

  return {
    init: init,
    save: save,
    addChild: addChild,
    addOnScreenChangeFunc: addOnScreenChangeFunc,
    addOnValueChangeFunc: addOnValueChangeFunc,
    nextScreen: nextScreen,
    prevScreen: prevScreen,
    goToScreen: goToScreen,
    isFirst: isFirst,
    isLast: isLast,
    isChildCompleted: isChildCompleted,
    getScreenCount: getScreenCount,
    getCurrentScreen: getCurrentScreen,
    getSelectedContainer: getSelectedContainer,
    getCurrentScreenTitle: getCurrentScreenTitle,
    getChildrenToShow: getChildrenToShow,
    childHasMandatory: childHasMandatory,
    getFormData: getFormData,
    getMasterPrimaryAction: getMasterPrimaryAction
  };


  /**
   * INIT & SETTERS
   */

  /**
   * Perform initialisation tasks
   * @param  {Object} masterModel  Form model object of the master form
   * @param  {Object} masterGForm  GlideForm instance of the master form
   * @return {undefined}
   */
  function init(masterModel, masterGForm, multiFormData) {

    master = {
      model: masterModel,
      gForm: masterGForm
    };

    mfData = multiFormData;

    /**
     * Reduce the _sections property down to an array of screens. This is 
     * required as for some reason when a form "split" is used, it is
     * considered another section. We need to merge the section created
     * by this "split" into the previous section.
     */

    var i = 0;

    containers = master.model._sections.reduce(function(acc, cv, idx) {

      /** Create a new container if the section has a caption or is first */
      if (cv.captionDisplay !== '' && idx !== 0) {
        i++;
      }

      acc = acc || [];

      acc[i] = acc[i] || [];
      acc[i].push(cv);

      return acc;

    }, false);

    /** @type {Integer}  The number of screens */
    screenCount = containers.length;

    /** Register onChange event on the form, so we know when the form has changed */
    master.gForm.$private.events.on('onChange', function(field, x, newVal) {
      _formChanged(field, newVal, master);
    });

    goToScreen(0);
  }

  /**
   * Add a child form
   * @param {String} childId            The SysID of the Multiform Child
   * @param {Integer} i                 The AngularJS ngRepeat $index
   * @param {Object} formModel          The form model of the form
   * @param {Object} gFormInstance      The GlideForm of the form
   * @param {String} referenceToParent  The field on the form which refers to the master
   */
  function addChild(childId, i, formModel, gFormInstance, referenceToParent) {

    childForms++;

    childrenBySection[childId] = childrenBySection[childId] || [];

    childrenBySection[childId][i] = {
      model: formModel,
      gForm: gFormInstance,
      referenceToParent: referenceToParent,
      childId: childId
    }

    children.push(childrenBySection[childId][i]);

    /** Register onChange event on the form, so we know when the form has changed */
    childrenBySection[childId][i].gForm.$private.events.on('onChange', function(field, x, newVal) {
      _formChanged(field, newVal, childrenBySection[childId][i]);
    });
  }

  /**
   * Register a function that will be called when the screen changes
   * @param {Function} func  The function to register
   */
  function addOnScreenChangeFunc(func) {
    screenChangeFuncs.push(func);
  }

  /**
   * Register a function that will be called when a form value changes
   * @param {Function} func  The function to register
   */
  function addOnValueChangeFunc(func) {
    valueChangeFuncs.push(func);
  }


  /**
   * GETTERS
   */

  /**
   * Get the The form model/GlideForm object for use in child widgets 
   * @return {Object}  The form model/GlideForm object
   */
  function getFormData() {
    return {
      children: children,
      master: master
    };
  }

  /**
   * Get the Multiform Children to show for the current screen
   * @return {Object} Structure containing the children to show
   */
  function getChildrenToShow() {

    /** The children for the current screen */
    var screenChildren = mfData.sections[getSelectedContainer()[0].id];

    return {
      top: (mfData.global.top || []).concat(screenChildren.top),
      right: (mfData.global.right || []).concat(screenChildren.right),
      bottom: (mfData.global.bottom || []).concat(screenChildren.bottom),
      left: (mfData.global.left || []).concat(screenChildren.left)
    }
  }

  /**
   * Get the container which relates to the current screen
   * @return {Object}  The container
   */
  function getSelectedContainer() {
    return containers ? containers[getCurrentScreen()] : false;
  }

  /**
   * Get the screen number we are on
   * @return {Integer}  The screen number
   */
  function getCurrentScreen() {
    return currentScreen;
  }

  /**
   * Get the total number of screens
   * @return {Integer} The number of screens
   */
  function getScreenCount() {
    return screenCount;
  }

  /**
   * Get the title of the screen we are currently on
   * @return {String}  The screen title
   */
  function getCurrentScreenTitle() {
    if (containers) {
      return containers[getCurrentScreen()][0].captionDisplay;
    }
  }

  /**
   * Check if we are on the last screen
   * @return {Boolean}  Whether we are on the last screen
   */
  function isLast() {
    return currentScreen === screenCount - 1;
  }

  /**
   * Check if we are on the first screen
   * @return {Boolean}  Whether we are on the first screen
   */
  function isFirst() {
    return currentScreen === 0;
  }

  /**
   * Check if a child form has all mandatory fields completed
   * @param  {String}  childId  The SysID of the Multiform Child
   * @param  {Integer}  index   The AngularJS ngRepeat $index
   * @return {Boolean}          Whether the form is completed
   */
  function isChildCompleted(childId, i) {

    if (childrenBySection[childId]) {
      return _getIncomplete(childrenBySection[childId][i].gForm).length === 0;
    }

    return false;
  }

  /**
   * Get the primary UI Action for the master form
   * @return {Object}  The UI Action
   */
  function getMasterPrimaryAction() {
    if (master) {
      return _getPrimaryAction(master);
    }
  }

  /**
   * Check whether a child form has mandatory fields
   * @param  {String}  childId  The SysID of the Multiform Child
   * @param  {Integer}  index   The AngularJS ngRepeat $index
   * @return {Boolean}          Whether the form has mandatory fields
   */
  function childHasMandatory(childId, i) {

    if (childrenBySection[childId] && childrenBySection[childId][i]) {

      var gFormInstance = childrenBySection[childId][i].gForm;

      var mandatory = [];
      var fieldNames = gFormInstance.getFieldNames();

      fieldNames.forEach(function(fieldName) {
        if (gFormInstance.isMandatory(fieldName)) {
          mandatory.push(fieldName);
        }
      });

      return mandatory.length > 0;
    }
  }


  /**
   * SCREEN NAVIGATION
   */

  /**
   * Progress to the next screen
   * @return {undefined}
   */
  function nextScreen() {
    currentScreen++;
    _processScreenChange();
  }

  /**
   * Progress to the previous screen
   * @return {undefined}
   */
  function prevScreen() {
    currentScreen--;
    _processScreenChange();
  }

  /**
   * Progress to a particular screen
   * @param  {Integer} screen  The screen number to change to
   * @return {undefined}
   */
  function goToScreen(screen) {
    currentScreen = screen;
    _processScreenChange();
  }

  /**
   * Helper function to perform common actions when the screen changes
   * @return {undefined}
   */
  function _processScreenChange() {
    screenChangeFuncs.forEach(function(cv) {
      cv();
    });
  }


  /**
   * FORM SAVING
   */

  /**
   * Save every form
   * @return {Promise}  A promise that will be resolved when all forms have saved
   */
  function save() {

    incompleteFieldNames = [];
    invalidMinMax = [];
    savedForms = 0;

    return $q(function(s, f) {

      success = s;
      failure = f;

      /**
       * Check to make sure all the mandatory fields are completed before saving.
       *
       * We need to do this because if say there are 5 forms on the page, and 2 of them save,
       * it could leave us in a bad situation, especially if some of the inserted records were
       * new records - in that case we would try to save the same new record twice, leading to
       * a failed save due to a duplicate unique key.
       */

      /** Check the master form for errors */
      var masterIncomplete = _getIncomplete(master.gForm);
      incompleteFieldNames = incompleteFieldNames.concat(masterIncomplete);

      masterIncomplete.forEach(function(fieldName) {
        _setErrorFieldMessage(fieldName, master.gForm);
      });

      /** Check children forms for errors */
      for (var key in childrenBySection) {
        if (childrenBySection.hasOwnProperty(key)) {
          childrenBySection[key].forEach(_checkChildIncomplete);
        }
      }

      if (incompleteFieldNames.length === 0 && invalidMinMax.length === 0) {
        /** No incomplete fields... let's save! */

        master.gForm.submit(_getPrimaryAction(master).action_name);
        masterListener = $rootScope.$on("spModel.uiActionComplete", _onMasterSaveSuccess);

      } else {
        /** There were some incomplete fields */

        /** TODO: Might be nice to go to the screen with the first error */
        goToScreen(0);

        spUtil.addErrorMessage(i18n.getMessage("Please complete all mandatory fields before submission"));

        failure(invalidMinMax, incompleteFieldNames);
      }
    });
  }

  /**
   * Function to execute when the master form reports back as being saved
   * @param  {Object} evt      AngularJS $on event object
   * @param  {Object} response HTTP response back from the server
   * @return {undefined}
   */
  function _onMasterSaveSuccess(evt, response) {

    master.sysId = (response.isInsert) ? response.sys_id : master.gForm.getUniqueValue();
    masterListener();

    if (childForms > 0) {

      childListener = $rootScope.$on("spModel.uiActionComplete", _onChildSaveSuccess);

      for (var key in childrenBySection) {
        if (childrenBySection.hasOwnProperty(key)) {
          childrenBySection[key].forEach(_saveChildForm);
        }
      }

    } else {
      success(master.sysId);
    }
  }

  /**
   * Save a child form
   * @param  {Object} cv  The model/gform object to save
   * @return {undefined}
   */
  function _saveChildForm(cv) {
    cv.gForm.setValue(cv.referenceToParent, master.sysId);
    cv.gForm.submit(_getPrimaryAction(cv).action_name);
  }

  /**
   * Function to execute when a child form reports back as being saved
   * @param  {Object} evt      AngularJS $on event object
   * @param  {Object} response HTTP response back from the server
   * @return {undefined}
   */
  function _onChildSaveSuccess(evt, response) {

    savedForms++;

    if (savedForms === childForms) {
      childListener();
      success(master.sysId);
    }
  }

  /**
   * Check whether a child form has incomplete fields
   * @param  {Object} cv  The form/gform object of the child
   * @return {undefined}
   */
  function _checkChildIncomplete(cv) {

    var childIncomplete = _getIncomplete(cv.gForm);

    childIncomplete.forEach(function(fieldName) {
      _setErrorFieldMessage(fieldName, cv.gForm);
    });

    incompleteFieldNames = incompleteFieldNames.concat(childIncomplete);
  }

  /**
   * Set the error field message on a particular form/field
   * @param {String} fieldName  The name of the field to set the message on
   */
  function _setErrorFieldMessage(fieldName, gForm) {
    gForm.showFieldMsg(fieldName, i18n.getMessage("This field must be completed"), 'error');
  }

  /**
   * Make sure all mandatory fields on the gForm supplied are completed
   * @param gFormInstance
   * @returns {Array}         an array containing names of incomplete fields
   */
  function _getIncomplete(gFormInstance) {

    var incomplete = [];
    var fieldNames = gFormInstance.getFieldNames();

    fieldNames.forEach(function(fieldName) {
      if (gFormInstance.isMandatory(fieldName)) {
        if (!_hasValue(fieldName, gFormInstance)) {
          incomplete.push(fieldName);
        }
      }

    });

    return incomplete;
  }

  /**
   * Check whether a particular field on a form has a value
   * Copied from /scripts/sn/common/clientScript/glideFormFieldFactory.js
   * @param  {String}  fieldName     The name of the field to check
   * @param  {Object}  gFormInstance The GlideForm of the form with the field
   * @return {Boolean}               Whether the field has a value
   */
  function _hasValue(fieldName, gFormInstance) {

    var field = gFormInstance.getField(fieldName);
    var value = gFormInstance.getValue(fieldName);

    switch (field.type) {
      case 'boolean_confirm':
        return value === 'true';
      case 'boolean':
        return true;
      case 'currency':
        var currencyValues = value.split(';');
        return currencyValues[1] && currencyValues[1].length;
      default:
        break;
    }

    if (value === null) {
      return false;
    }

    if (typeof value === 'undefined') {
      return false;
    }

    var trimmed = String(value).trim();
    return trimmed.length > 0;
  }

  /**
   * Get the primary UI action from the form model/GlideForm object
   * @param  {Object} item  The form model/GlideForm object
   * @return {String}       The action name
   */
  function _getPrimaryAction(item) {

    var primaryActions = item.model._ui_actions.filter(function(action) {
      return action.primary;
    });

    return (primaryActions.length) ? primaryActions[0] : '';
  }

  /**
   * Function to execute when a value on a form changes.
   * @param  {String} field      The field that changed
   * @param  {String} newVal     The new value
   * @param  {Object} modelGForm The form model/GlideForm object containing the field that changed
   * @return {undefined}
   */
  function _formChanged(field, newVal, modelGForm) {

    modelGForm.gForm.hideErrorBox(field);

    valueChangeFuncs.forEach(function(cv) {
      cv(field, newVal, modelGForm);
    });
  }
});