const express = require("express");
const cors = require("cors");
const priceRoutes = require("./routes/v1/priceRoutes");
const swaggerDoc = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/prices", priceRoutes);
swaggerDoc(app);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
