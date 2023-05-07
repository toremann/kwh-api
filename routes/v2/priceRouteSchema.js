/**
 * @swagger
 * tags:
 *   name: Prices
 * /v2/prices/push:
 *   get:
 *     summary: Get highest and lowest electricity prices and average price for the day
 *     tags: [Electricity Prices]
 *     responses:
 *       200:
 *         description: Successful response with electricity price information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 priceInfo:
 *                   type: string
 *                   description: Information on highest and lowest electricity prices and average price for the day
 *       500:
 *         description: Error occurred while fetching electricity prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
