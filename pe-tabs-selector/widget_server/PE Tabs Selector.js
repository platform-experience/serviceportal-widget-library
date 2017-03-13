(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.title = input.title || options.title;

  data.input = [
    {
      'displayName': 'AWS',
      'name': 'aws',
      'idIcon': '#icon-aws',
      'classIcon': 'aws-icon',
      'classIconActive': 'aws-icon-active',
      'showOnlyIcon' : false
    },
    {
      'displayName': 'VMware',
      'name': 'vmware',
      'idIcon': '#icon-vmware',
      'classIcon': 'vmware-icon',
      'classIconActive': 'vmware-icon-active',
      'showOnlyIcon' : true
    },
    {
      'displayName': 'Azure',
      'name': 'azure',
      'idIcon': '#icon-azure',
      'classIcon': 'azure-icon',
      'classIconActive': 'azure-icon-active',
      'showOnlyIcon' : false
    }
  ];

})();