function BarcodeReaderFiController($scope, $window) {
  /* widget controller */
  var c = this;
  c.title = 'Barcode reader Title';

  c.data.products = [];
  c.callbackBarcode = {};
  c.callbackBarcode.warningText = '';

  c.getBarcode = function (input) {
    if (input) {
      if (input.codeResult) {

        c.callbackBarcode = {};
        c.callbackBarcode.warningText = '';
        c.callbackBarcode = input;
        //lockup
        c.getProductModel(input.codeResult.code, true);

      } else {
        c.callbackBarcode = {};
        c.callbackBarcode.warningText = 'The barcode was not aquired, please enter it manually';
      }
    }
  };
  c.searchUpdate = function (input) {
    c.callbackBarcode.warningText = '';
    if (input.length >= 3) {

      c.getProductModel(input, false);
      c.data.resultProducts = c.data.products;
    } else
      c.data.resultProducts = [];
  };

  c.getProductModel = function (code, auto) {
    c.server.get({
      barcode: code
    }).then(function (response) {

      if (response.data.products.length > 0) {
        c.data.products = response.data.products;
        if (auto == false)
          c.data.resultProducts = c.data.products;

        console.log(c.data.products);
        return c.data.products;
      } else {
        c.data.resultProducts = [];
      }
    });
  }

  c.selectBarcode = function (code) {
    if (code) {
      console.log('barcode selected', code);
    }
  };

  c.hideResult = function (item) {
    if (item) {
      document.getElementById('results').style.display = 'none';
      document.getElementById('results').style.borderWidth = '0px';
    }
  };

  if (!$scope.readers) {
    $scope.readers = [{
      format: 'code_128_reader',
      config: {}
    }];
  }
  if (!$scope.patchSize)
    $scope.patchSize = 'large';
  if (!$scope.size)
    $scope.size = '800';
  var multiple = false;
  if ($scope.readers.length > 1)
    multiple = true;
  c.input_properties = {
    'inputStream': {
      'size': $scope.size,
      'singleChannel': false
    },
    'locator': {
      'patchSize': $scope.patchSize,
      'halfSample': true
    },
    'decoder': {
      readers: $scope.readers,
      multiple: false
    },
    'locate': true,
    'src': null
  };

  console.log('QuaggaJS config used: ', c.input_properties);

  var App = {
    init: function () {
      App.attachListeners();
    },
    attachListeners: function () {
      var self = this;
      $('.form-group input[type=file]').on('change', function (e) {
        if (e.target.files && e.target.files.length) {
          App.decode(URL.createObjectURL(e.target.files[0]));
        }
      });
    },
    _accessByPath: function (obj, path, val) {
      var parts = path.split('.'),
        depth = parts.length,
        setter = (typeof val !== 'undefined') ? true : false;
      return parts.reduce(function (o, key, i) {
        if (setter && (i + 1) === depth) {
          o[key] = val;
        }
        return key in o ? o[key] : {};
      }, obj);
    },
    _convertNameToState: function (name) {
      return name.replace('_', '.').split('-').reduce(function (result, value) {
        return result + value.charAt(0).toUpperCase() + value.substring(1);
      });
    },
    detachListeners: function () {
      $('.form-group input[type=file]').off('change');
    },
    decode: function (src) {
      var self = this,
        config = $.extend({}, self.state, {
          src: src
        });
      Quagga.decodeSingle(config, function (result) {
        if (!result.codeResult) {
          console.log('QuaggaJS barcode not aquired ', result);
          c.getBarcode(result);


        }
      });
    },
    inputMapper: {
      inputStream: {
        size: function (value) {
          return parseInt(value);
        }
      },
      numOfWorkers: function (value) {
        return parseInt(value);
      },
      decoder: {
        readers: function (value) {
          if (value === 'ean_extended') {
            return [{
              format: 'ean_reader',
              config: {
                supplements: [
                  'ean_5_reader', 'ean_2_reader'
                ]
              }
            }];
          }
          return [{
            format: value + '_reader',
            config: {}
          }];
        }
      }
    },
    state: c.input_properties
  };

  App.init();

  function calculateRectFromArea(canvas, area) {
    var canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      top = parseInt(area.top) / 100,
      right = parseInt(area.right) / 100,
      bottom = parseInt(area.bottom) / 100,
      left = parseInt(area.left) / 100;
    top *= canvasHeight;
    right = canvasWidth - canvasWidth * right;
    bottom = canvasHeight - canvasHeight * bottom;
    left *= canvasWidth;
    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    };
  }
  Quagga.onProcessed(function (result) {
    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay,
      area;
    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, {
            x: 0,
            y: 1
          }, drawingCtx, {
              color: 'green',
              lineWidth: 2
            });
        });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {
          x: 0,
          y: 1
        }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
      }
      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {
          x: 'x',
          y: 'y'
        }, drawingCtx, {
            color: 'red',
            lineWidth: 3
          });
      }
      if (App.state.inputStream.area) {
        area = calculateRectFromArea(drawingCanvas, App.state.inputStream.area);
        drawingCtx.strokeStyle = '#0F0';
        drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
      }
    }
  });
  Quagga.onDetected(function (result) {
    var $node, code = result.codeResult.code,
      canvas = Quagga.canvas.dom.image;
    code = code.trim();
    console.log('QuaggaJS detected code: ', code);
    var array = [];
    array.push(result);
    result = {};
    result = array[0];
    result.canvas = canvas;
    result.mainCanvas = Quagga.canvas;
    result.canvasURL = canvas.toDataURL();
    $scope.result = result;

    $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
    $node.find("img").attr("src", canvas.toDataURL());
    $node.find("h4.code").html(code);
    $("#result_strip ul.thumbnails").prepend($node);

    c.getBarcode(result);
  });
}