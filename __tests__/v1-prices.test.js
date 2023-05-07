const request = require('supertest');
const express = require('express');
const { getTodaysPrices, getHighestAndLowestPrices, getAveragePrice } = require('../utils/price.js');

const router = require('../routes/v1/priceRoutes.js');

jest.mock('../utils/price.js');

const app = express();
app.use('/v1/prices', router);

describe('Routes', () => {
  describe('GET /v1/prices/today', () => {
    test('should return 200 OK with a list of prices', async () => {
      getTodaysPrices.mockResolvedValue([{ price: 10, date: '2022-01-01' }]);

      const response = await request(app).get('/v1/prices/today');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([{ price: 10, date: '2022-01-01' }]);
    });

    test('should return 500 Internal Server Error if an error occurs', async () => {
      getTodaysPrices.mockRejectedValue(new Error('An error occurred'));

      const response = await request(app).get('/v1/prices/today');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'An error occurred while fetching prices' });
    });
  });

  describe('GET /v1/prices/highlow', () => {
    test('should return 200 OK with the highest and lowest prices', async () => {
      getHighestAndLowestPrices.mockResolvedValue({ highest: 20, lowest: 10, date: '2022-01-01' });

      const response = await request(app).get('/v1/prices/highlow');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ highest: 20, lowest: 10, date: '2022-01-01' });
    });

    test('should return 500 Internal Server Error if an error occurs', async () => {
      getHighestAndLowestPrices.mockRejectedValue(new Error('An error occurred'));

      const response = await request(app).get('/v1/prices/highlow');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'An error occurred while fetching prices' });
    });
  });

  describe('GET /v1/prices/average', () => {
    test('should return 200 OK with the highest and lowest prices', async () => {
      getAveragePrice.mockResolvedValue([10, 20, 30]);

      const response = await request(app).get('/v1/prices/average');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([10, 20, 30]);
    });

    test('should return 500 Internal Server Error if an error occurs', async () => {
      getAveragePrice.mockRejectedValue(new Error('An error occurred'));

      const response = await request(app).get('/v1/prices/average');

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'An error occurred while fetching prices' });
    });
  });
})
