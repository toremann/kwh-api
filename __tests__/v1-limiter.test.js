const request = require("supertest");
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later"
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

describe("Rate limiting", () => {
  it("should allow 10 requests per hour", async () => {
    for (let i = 0; i < 10; i++) {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    }

    const response = await request(app).get("/");
    expect(response.status).toBe(429);
    expect(response.text).toBe("Too many requests, please try again later");
  });
});
