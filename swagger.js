const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "kwh-api",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./routes/v1/*.js"], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = function (app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
