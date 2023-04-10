const express = require("express");
const { getAllPrices, getHighestAndLowestPrices } = require("./price.js");
const app = express();

app.get("/all", async (req, res) => {
  try {
    const prices = await getAllPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

app.get("/highlow", async (req, res) => {
  try {
    const prices = await getHighestAndLowestPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
