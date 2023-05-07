const express = require("express");
const {
  getTodaysPrices,
  getHighestAndLowestPrices,
  getAveragePrice
} = require("../../utils/price.js");

const router = express.Router();

router.get("/today", async (req, res) => {
  try {
    const prices = await getTodaysPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

router.get("/average", async (req, res) => {
  try {
    const prices = await getAveragePrice();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

router.get("/highlow", async (req, res) => {
  try {
    const prices = await getHighestAndLowestPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

module.exports = router;
