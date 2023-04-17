/**
 * @swagger
 * securityDefinitions:
 *   apiKey:
 *     type: apiKey
 *     name: x-api-key
 *     in: header
 *
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
 *       - apiKey: []
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
 *       - apiKey: []
 */

/**
 * @swagger
 * /v1/prices/average:
 *   get:
 *     summary: Returns the average price
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: Average price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *     security:
 *       - apiKey: []
 */