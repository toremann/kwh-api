/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: API for getting price information
 */

/**
 * @swagger
 * /v1/prices/all:
 *   get:
 *     summary: Returns all prices
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: A list of prices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                   date:
 *                     type: string
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /v1/prices/highlow:
 *   get:
 *     summary: Returns the highest and lowest prices
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: The highest and lowest prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 highest:
 *                   type: number
 *                 lowest:
 *                   type: number
 *                 date:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 */

const express = require("express");
const {
  getAllPrices,
  getHighestAndLowestPrices,
} = require("../../utils/price.js");

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
