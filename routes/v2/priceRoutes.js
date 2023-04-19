const express = require("express");
const {
  getHighestAndLowestPrices,
  getAveragePrice,
} = require("../../utils/price.js");

const router = express.Router();

router.get("/push", async (req, res) => {
  try {
    const prices = await getHighestAndLowestPrices();
    const average = await getAveragePrice();

    const highestPriceTime = new Date(prices.highestPriceTime);
    const highestPriceTimePlusOneHour = new Date(
      highestPriceTime.getTime() + 60 * 60 * 1000
    );
    const highestPriceStartTime = highestPriceTime.toLocaleTimeString("nb-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const highestPriceEndTime = highestPriceTimePlusOneHour.toLocaleTimeString(
      "nb-NO",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const lowestPriceTime = new Date(prices.lowestPriceTime);
    const lowestPriceTimePlusOneHour = new Date(
      lowestPriceTime.getTime() + 60 * 60 * 1000
    );
    const lowestPriceStartTime = lowestPriceTime.toLocaleTimeString("nb-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const lowestPriceEndTime = lowestPriceTimePlusOneHour.toLocaleTimeString(
      "nb-NO",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    const priceInfo = `Gjennomsnittlig pris for ditt område idag ${(
      average / 1000
    ).toLocaleString("nb-NO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}NOK/kWh. Strømmen er dyrest fra ${highestPriceStartTime} til ${highestPriceEndTime}. (${(
      prices.highestPrice / 1000
    ).toLocaleString("nb-NO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}NOK/kWh). Strømmen er billigst fra ${lowestPriceStartTime} til ${lowestPriceEndTime} (${(
      prices.lowestPrice / 1000
    ).toLocaleString("nb-NO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}NOK/kWh).`;
    res.send(priceInfo);
    // Gjennomsnittlig pris for ditt område idag 1,09NOK/kWh. Strømmen er dyrest fra 08:00 til 09:00. (1,45NOK/kWh). Strømmen er billigst fra 14:00 til 15:00 (0,85NOK/kWh).
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

module.exports = router;
