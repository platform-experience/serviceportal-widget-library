function SignatureModalHeaderController(spUtil) {
  var c = this;
  c.getCompleteStyleOne = getCompleteStyleOne;
  c.getCompleteStyleTwo = getCompleteStyleTwo;

  c.$onInit = function() {
    getScratchPad();
    c.yesterday = moment(new Date()).subtract(1, 'days').date();
    c.month = moment(new Date()).subtract(1, 'days').format('MMM');
    c.documentUser = 'Suzy Ham';
    c.title = 'TAX DOCUMENT';
    c.subTitle = 'RELOCATION';
  };

  function getScratchPad() {
    spUtil.get('pe-scratch-pad', {}).then(function(response) {
      c.data.scratchPadWidget = response;
    });
  }

  function getCompleteStyleOne(type) {
    if (type === 'complete') {
      return {
        'background': '#fff',
        'clip': 'rect(0 40px 22px 0)',
        'transform': 'rotate(90deg)',
        'border-radius': '50%'
      };
    }
  }

  function getCompleteStyleTwo(deg) {
    return {
      'background': '#fff',
      'clip': 'rect(0 20px 40px 0)',
      'transform': 'rotate(' + deg + 'deg)',
      'border-radius': '50%'
    };
  }
}