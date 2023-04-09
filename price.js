const { Prices } = require("nordpool");

const prices = new Prices();

const opts = {
  area: "Oslo", // See http://www.nordpoolspot.com/maps/
  currency: "NOK", // can also be 'DKK', 'EUR', 'NOK'
};

const fetchPrices = async () => {
  let results;
  try {
    results = await prices.hourly(opts);
    const formattedResults = results.map((result) => {
      const date = result.date;
      const price = result.value;
      return { time: date, price: price };
    });
    console.log(formattedResults);
    return formattedResults;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching prices" };
  }
};

module.exports.fetchPrices = fetchPrices;
