// objects with 3 Exchange Rates
const rates = {};

// find elements for variables
const elemUSD = document.querySelector('[data-value = "USD"]');
const elemEUR = document.querySelector('[data-value = "EUR"]');
const elemGBP = document.querySelector('[data-value = "GBP"]');

// find elems of form to change
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


// 1 try geting response
// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//   return result.json()  
// }).then(function (data){
//   console.log(data);
// })


// 2 try getting response and show
getCurrencies();
async function getCurrencies() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  //JSON parse
  const data = await response.json();
  // get object from promise
  const responseResult = await data;
  // console.log(responseResult);
  // console.log(responseResult.Valute.USD);
  // console.log(responseResult.Valute.USD.Value);

  // get only needed currency
  rates.USD = responseResult.Valute.USD;
  rates.EUR = responseResult.Valute.EUR;
  rates.GBP = responseResult.Valute.GBP;
  // console.log(rates);

  // set rates values in html
  elemUSD.textContent = rates.USD.Value.toFixed(2);
  elemEUR.textContent = rates.EUR.Value.toFixed(2);
  elemGBP.textContent = rates.GBP.Value.toFixed(2);

  // checking the USD value with the previous day. falls/growing.
  if (rates.USD.Value > rates.USD.Value.Prevoius) {
    elemUSD.classList.add('up')
  } else {
    elemUSD.classList.add('down')
  }

  // checking the EUR value with the previous day. falls/growing.
  if (rates.EUR.Value > rates.EUR.Value.Prevoius) {
    elemEUR.classList.add('up')
  } else {
    elemEUR.classList.add('down')
  }

  // checking the GBP value with the previous day. falls/growing.
  if (rates.GBP.Value > rates.GBP.Value.Prevoius) {
    elemGBP.classList.add('up')
  }
  else {
    elemGBP.classList.add('down')
  }

}

// count result from input
input.oninput = convertValue;
// count result from select
select.oninput = convertValue;

// convert func
function convertValue() {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}