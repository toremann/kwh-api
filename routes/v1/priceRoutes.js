const express = require("express");
const { getAllPrices, getHighestAndLowestPrices } = require("../../utils/price.js");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const prices = await getAllPrices();
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
