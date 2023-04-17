const { Prices } = require("nordpool");

const prices = new Prices();

const opts = {
  area: "Oslo", // See http://www.nordpoolspot.com/maps/
  currency: "NOK", // can also be 'DKK', 'EUR', 'NOK'
};

const getTodaysPrices = async () => {
  try {
    const results = await prices.hourly(opts);
    const formattedResults = results.map((result) => {
      const date = result.date;
      const price = result.value;
      return { time: date, price: price };
    });
    return formattedResults;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching prices" };
  }
};

const getAveragePrice = async () => {
  try {
    const allPrices = await getTodaysPrices();
    const total = allPrices.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
    const averagePrice = total / allPrices.length;
    return averagePrice;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching prices" };
  }
};

const getHighestAndLowestPrices = async () => {
  try {
    const allPrices = await getTodaysPrices();
    const highestPriceObj = allPrices.reduce((acc, curr) => {
      return acc.price > curr.price ? acc : curr;
    });
    const lowestPriceObj = allPrices.reduce((acc, curr) => {
      return acc.price < curr.price ? acc : curr;
    });

    const highestPrice = highestPriceObj.price;
    const highestPriceTime = highestPriceObj.time;
    const lowestPrice = lowestPriceObj.price;
    const lowestPriceTime = lowestPriceObj.time;

    return { highestPrice, highestPriceTime, lowestPrice, lowestPriceTime };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching prices" };
  }
};

module.exports = { getTodaysPrices, getHighestAndLowestPrices, getAveragePrice };
