function BarcodeReaderLiveController($scope, $window) {
	/* widget controller */
	var c = this;

	c.result = '';

	c.data.showProducts = [];
	c.data.scanProducts = [];
	c.visible = false;


	c.searchUpdate = function (input) {
		if (input.length >= 3) {
			c.getProductModel(input, true);
		} else
			c.data.showProducts = [];
	};

	c.getProductModel = function (code, manual, image) {
		c.server.get({
			barcode: code
		}).then(function (response) {
			if (response.data.products.length > 0) {
				if (manual)
					c.data.showProducts = response.data.products;
				else {
					c.data.showProducts = [];
					for (var i = 0; i < response.data.products.length; i++) {
						//$node.find("img").attr("src", canvas.toDataURL());
						response.data.products[i].image = image;
						c.data.scanProducts.push(response.data.products[i]);
						c.data.showProducts.push(response.data.products[i]);
					}

				}
			} else {
				if (manual)
					c.data.showProducts = [];
			}

		});


	};

	c.selectBarcode = function (code) {
		if (code) {
			console.log('barcode selected', code);
		}
	};

	c.hideResult = function (item) {
		if (item) {
			document.getElementById('results').style.display = 'none';
		}
	};

	c.showResult = function () {
		document.getElementById('results').style.display = 'block';
	};

	var App = {
		init: function () {
			var self = this;

			Quagga.init(this.state, function (err) {
				if (err) {
					return self.handleError(err);
				}
				App.checkCapabilities();
				Quagga.start();
			});
		},
		handleError: function (err) {
			console.log(err);
		},
		checkCapabilities: function () {
			var track = Quagga.CameraAccess.getActiveTrack();
			var capabilities = {};
			if (typeof track.getCapabilities === 'function') {
				capabilities = track.getCapabilities();
			}

			this.applySettingsVisibility('zoom', capabilities.zoom);
			this.applySettingsVisibility('torch', capabilities.torch);
		},
		updateOptionsForMediaRange: function (node, range) {
			var NUM_STEPS = 6;
			var stepSize = (range.max - range.min) / NUM_STEPS;
			var option;
			var value;
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
			for (var i = 0; i <= NUM_STEPS; i++) {
				value = range.min + (stepSize * i);
				option = document.createElement('option');
				option.value = value;
				option.innerHTML = value;
				node.appendChild(option);
			}
		},
		applySettingsVisibility: function (setting, capability) {
			// depending on type of capability
			if (typeof capability === 'boolean') {
				var node = document.querySelector('input[name="settings_' + setting + '"]');
				if (node) {
					node.parentNode.style.display = capability ? 'block' : 'none';
				}
				return;
			}
			if (window.MediaSettingsRange && capability instanceof window.MediaSettingsRange) {
				var node = document.querySelector('select[name="settings_' + setting + '"]');
				if (node) {
					this.updateOptionsForMediaRange(node, capability);
					node.parentNode.style.display = 'block';
				}
				return;
			}
		},
		initCameraSelection: function () {
			var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

			return Quagga.CameraAccess.enumerateVideoDevices()
				.then(function (devices) {
					function pruneText(text) {
						return text.length > 30 ? text.substr(0, 30) : text;
					}
				});
		},
		state: {
			inputStream: {
				type: "LiveStream",
				constraints: {
					width: {
						min: 640
					},
					height: {
						min: 480
					},
					facingMode: "environment",
					aspectRatio: {
						min: 1,
						max: 100
					}
				}
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			},
			numOfWorkers: 1,
			frequency: 20,
			decoder: {
				readers: [{
					format: c.data.barcode_standard,
					config: {}
				}]
			},
			locate: true
		},
		lastResult: null
	};

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, {
						x: 0,
						y: 1
					}, drawingCtx, {
						color: "green",
						lineWidth: 2
					});
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, {
					x: 0,
					y: 1
				}, drawingCtx, {
					color: "#00F",
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
		}
	});

	Quagga.onDetected(function (result) {
		var code = result.codeResult.code;
		c.result = code;

		if (App.lastResult !== code) {
			App.lastResult = code;
			var $node = null,
				canvas = Quagga.canvas.dom.image;

			c.getProductModel(code, false, canvas.toDataURL());

		}

		c.hideStream();
	});

	c.showStream = function () {
		c.visible = true;
		App.init();

	}

	c.hideStream = function () {
		Quagga.stop();
		c.visible = false;
	}


}