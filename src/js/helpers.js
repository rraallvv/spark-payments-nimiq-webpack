
export function getExchangeRate (currency) {
  return new Promise(resolve => {
    // if (currency.match( /ARS|AUD|BRL|CAD|DKK|AED|EUR|HKD|INR|ILS|KES|MXN|NZD|NOK|PHP|PLN|GBP|SGD|SEK|CHF|USD|JPY|CNY/g ) !== null) {
    //   ajax(`https://api.uphold.com:443/v0/ticker/${token}${currency}`)
    //     .then(function(result) {
    //       const rate = parseFloat(result.ask + result.bid) / 2;
    //       console.log(rate);
    //       resolve(rate);
    //     })
    //     .catch(function(e) {
    //       console.log(`error: ${e}`);
    //     });
    // } else { // end
    ajax(`https://api.nimizuela.org/${currency}`)
      .then(function (result) {
        console.log(`exchange rate: ${result[currency]}`)
        resolve(parseFloat(result[currency]))
      })
      .catch(function (e) {
        console.log(`error: ${e}`)
      })
    // } // end
  })
}

export function getAddress (account) {
  return new Promise(resolve => {
    resolve(account)
  })
}

function ajax (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(JSON.parse(this.responseText))
    }
    xhr.onerror = reject
    xhr.open('GET', url)
    xhr.send()
  })
}
