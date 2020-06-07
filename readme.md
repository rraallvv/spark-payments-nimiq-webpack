# Spark Payments (Web and Mobile)

Spark Payments is a mobile-friendly payment terminal app for web and mobile that merchants can use to accept Nimiq payments.

## Current Features

* Enter sale amounts in your local currency (supports 94 currencies) and have them converted to an amount in Nimiq
* A QR code payment request is generated
* Get an on-screen notification when the requested amount is received at your address
* Translated to 12 languages so far
* Password protected settings page
* Compatible with Ledger/Trezor/KeepKey hardware wallets

## Local Development Server
To run the development server that provides live reloading, run:
```npm run start``` or  ```yarn start```

## Production Build
```npm run build:prod``` or  ```yarn build:prod```

> Note: If hosted in a sub-folder, e.g. domain.com/project/, please update the **baseURL** in:
> * webpack.config.js
> * package.json

The productions files are located in **/dist** folder:

 - index.html
 - static
 - assets

## License
Spark Nimiq is released under the AGPL-3.0 license. See [LICENSE.txt](https://github.com/rraallvv/spark-payments-nimiq-webpack/blob/master/LICENSE.txt).
