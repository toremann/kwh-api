# kwh api

- This is a simple express API that retrieves hourly electricity prices from Nordpool and returns them as JSON.
- This app uses: [https://github.com/samuelmr/nordpool-node](https://github.com/samuelmr/nordpool-node)

## Installation

- Clone the repository
- Install dependencies: npm install
- npm start from project folder

## Configuration
You can change the area and currency for which the prices are retrieved by modifying the opts object in price.js.

## Swagger
You can check of the different endpoints at hostname/api-docs

```js 
const opts = {
  area: 'Oslo', // See http://www.nordpoolspot.com/maps/
  currency: 'NOK' // can also be 'DKK', 'EUR', 'NOK'
};
```
