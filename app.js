const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const priceRoutes = require("./routes/v1/priceRoutes");
const swaggerDoc = require("./swagger");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiKeyFormat = /[A-Za-z0-9]{32}/;
const validApiKeys = new Set([process.env.API_KEY]); // Specify key in .env file or in docker env.

const verifyApiKey = (req, res, next) => {
  const apiKey = req.header("X-API-KEY") || req.query.apiKey;
  if (!apiKey || !apiKeyFormat.test(apiKey)) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  if (!validApiKeys.has(apiKey)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use("/v1/prices", limiter, verifyApiKey, priceRoutes); 
swaggerDoc(app);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
