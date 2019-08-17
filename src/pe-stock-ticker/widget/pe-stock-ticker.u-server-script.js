data.typeSymbolMsg = gs.getMessage("Type stock symbol");
data.apikey = gs.getProperty('alphavantage.api.key');
data.wrongSymbol = "";
$sp.log(options.default_symbol);
if (input && input.symbol) {
  data.wrongSymbol = "";
  getQuote(input.symbol);
}else if(options.default_symbol){
  getQuote(options.default_symbol);
}

function getQuote(symbol) {
  try {
    var r = new sn_ws.RESTMessageV2('Alphavantage', 'Default GET');
    r.setStringParameterNoEscape('symbol', symbol);
    r.setStringParameterNoEscape('apikey', data.apikey);
    var response = r.execute();
    $sp.log(response);
    data.responseBody = JSON.parse(response.getBody());
    var httpStatus = response.getStatusCode();
    if (data.responseBody['Error Message']) {
      $sp.log("wrong symbol");
      data.wrongSymbol = "Symbol not found"
    }
    $sp.log(httpStatus);
    $sp.log(data.responseBody);
  } catch (ex) {
    var message = ex.message;
  }






}