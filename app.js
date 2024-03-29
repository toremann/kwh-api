const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const priceRoutesv1 = require("./routes/v1/priceRoutes");
const priceRoutesv2 = require("./routes/v2/priceRoutes");
const swaggerDoc = require("./swagger");
const morgan = require("morgan");
// require('dotenv').config();
const port = process.env.PORT || 3000;

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
};

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use(morgan("[:date[clf]] :method :url"));
app.use("/v1/prices", limiter, verifyApiKey, priceRoutesv1);
app.use("/v2/prices", limiter, verifyApiKey, priceRoutesv2);
swaggerDoc(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
