var googleFinance = require('google-finance');

var exchange = 'NASDAQ';
var quote = '';

// Process command line arguments.
process.argv.forEach(function (val, index, array) {
  switch (val) {
    
    case '--exchange':
      exchange = array[index+1];
      exchange = exchange.toUpperCase();
      break;

    case '--quote':
      quote = array[index+1];
      quote = quote.toUpperCase();
      break;
  }
});

googleFinance.companyNews({
  symbol: 'NASDAQ:AAPL'
}, function (err, news) {
  //...
});
 
googleFinance.historical({
  symbol: exchange + ':' + quote, // May equate to something like "NASDAQ:AAPL"
  from: getYesterdaysDate(),
  to: getCurrentDate(),
}, function (err, quotes) {
  quotes.forEach(function(val, index, array) {
    var change = val.close - val.open;
    var changeIndicator = change ? '+' : '';
    console.log(generateOutputForQuote(val));
  });
});

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd;
  } 
  if(mm<10){
    mm='0'+mm;
  } 
  return yyyy + '-' + mm + '-' + dd;
}

function getYesterdaysDate() {
  var today = new Date();
  var dd = today.getDate() - 1;

  // todo: polish this logic. Some months may have less than 31 days.
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd;
  } 
  if(mm<10) {
    mm='0'+mm;
  } 
  return yyyy + '-' + mm + '-' + dd;
}

function generateOutputForQuote(quote) {
  var change = quote.close - quote.open;
  var changeIndicator = change >= 0 ? '+' : '';
  var output = 'Price: $' + quote.close + ' ' + quote.symbol + ' Change: ' + changeIndicator + change;
  
  return output;
}
