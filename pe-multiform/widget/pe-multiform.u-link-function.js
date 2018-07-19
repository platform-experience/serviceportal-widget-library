function PiMultiFormLink (scope, elem, attrs) {

  'use strict';

  var formState = [];

  scope.toggleIcon = toggleIcon;
  scope.toggle = toggle;
  scope.makeArray = makeArray;
  scope.isExpanded = isExpanded;

  /**
	 * Different class depending on the state of expansion
	 * @param  {Boolean} state  State of expansion
	 * @return {Object}         Classes to attach
	 */
  function toggleIcon (state) {
    return {
      'fa-chevron-down': !state,
      'fa-chevron-up': state
    };
  }

  /**
	 * Toggle the expansion state of a child form
	 * @param  {[type]} child [description]
	 * @param  {[type]} idx   [description]
	 * @return {[type]}       [description]
	 */
  function toggle (child, idx) {
    formState[child.sysId] = formState[child.sysId] || [];
    formState[child.sysId][idx] = !formState[child.sysId][idx];
  }


  /**
	 * Check whether a child form is expanded
	 * @param  {[type]}  child [description]
	 * @param  {[type]}  idx   [description]
	 * @return {Boolean}       [description]
	 */
  function isExpanded (child, idx) {
    formState[child.sysId] = formState[child.sysId] || [];
    return formState[child.sysId][idx];
  }

  /**
	 * Dumb function to make an array containing a certain number of elements
	 * @param  {Integer} count  Number of elements in the new array
	 * @return {Array}          A new array containing X elements
	 */
  function makeArray (count) {
    return new Array(count);
  }

}