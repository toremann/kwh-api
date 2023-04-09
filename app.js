const express = require("express");
const { fetchPrices } = require("./price.js");
const app = express();

app.get("/", async (req, res) => {
  try {
    const prices = await fetchPrices();
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching prices" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
