function StockTickerController($http) {
  var c = this;

  c.$onInit = function () {
    c.loading = false;
    c.update = update;
    c.data.price = false;
    c.latestQuote = "";
    c.currentSymbol = "";
    initiate();
  };

  function initiate() {
    c.loading = true;
    c.data.wrongSymbol = "";
    if (c.data.responseBody) {
      if (c.data.wrongSymbol) {
        c.loading = false;
        c.data.wrongSymbol = c.data.wrongSymbol;
      } else {
        processData(c.data.responseBody);
        c.loading = false;
      }
    }
  }

  function update() {
    c.loading = true;
    c.latestQuote = "";
    c.data.wrongSymbol = "";
    c.server.get({
      symbol: c.data.symbol
    }).then(function (r) {
      if (r.data.wrongSymbol) {
        c.loading = false;
        c.data.wrongSymbol = r.data.wrongSymbol;
      } else {
        processData(r.data.responseBody);
        c.loading = false;
      }

    });
  }

  function processData(responseData) {
    c.data.responseData = responseData;
    if (c.data.responseData.hasOwnProperty('Time Series (1min)')) {
      var latestDate = Object.keys(c.data.responseData['Time Series (1min)']).sort().reverse()[0];
      if (c.data.responseData['Time Series (1min)'][latestDate].hasOwnProperty('1. open') &&
        c.data.responseData['Time Series (1min)'][latestDate].hasOwnProperty('2. high') &&
        c.data.responseData['Time Series (1min)'][latestDate].hasOwnProperty('3. low') &&
        c.data.responseData['Time Series (1min)'][latestDate].hasOwnProperty('4. close') &&
        c.data.responseData['Time Series (1min)'][latestDate].hasOwnProperty('5. volume')
      ) {
        c.latestQuote = {
          'symbol': c.data.symbol,
          'open': c.data.responseData['Time Series (1min)'][latestDate]['1. open'],
          'high': c.data.responseData['Time Series (1min)'][latestDate]['2. high'],
          'low': c.data.responseData['Time Series (1min)'][latestDate]['3. low'],
          'close': c.data.responseData['Time Series (1min)'][latestDate]['4. close'],
          'volume': c.data.responseData['Time Series (1min)'][latestDate]['5. volume']
        }
      }
    }
    c.currentSymbol = c.data.responseData['Meta Data']['2. Symbol'].toUpperCase();
  }
}