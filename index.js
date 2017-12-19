var googleFinance = require('google-finance');
 
googleFinance.companyNews({
  symbol: 'NASDAQ:AAPL'
}, function (err, news) {
  //...
});
 
googleFinance.historical({
  symbol: 'NASDAQ:AAPL',
  from: getYesterdaysDate(),
  to: getCurrentDate(),
}, function (err, quotes) {
  console.log(quotes);
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
