const request = require("supertest");
const express = require("express");
const router = require('../routes/v2/priceRoutes')

describe("GET /push", () => {
  const app = express();
  app.use(router);

  it("should return the expected response with valid data", async () => {
    const response = await request(app).get("/push");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Gjennomsnittlig pris for ditt område idag");
  });
});
