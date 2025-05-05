const express = require('express');
const router = express.Router();
const priceData = require('../data/priceData.json');

// Get all countries
router.get('/countries', (req, res) => {
  const countries = priceData.map(item => ({
    region: item.Region,
    country: item.Country,
    currency: item.Currency
  }));
  res.json(countries);
});

// Get pricing for a specific country
router.get('/pricing/:country', (req, res) => {
  const country = req.params.country;
  const pricing = priceData.find(item => item.Country === country);
  
  if (!pricing) {
    return res.status(404).json({ error: 'Country not found' });
  }
  
  res.json(pricing);
});

// Get all pricing data (for admin purposes)
router.get('/all-pricing', (req, res) => {
  res.json(priceData);
});

module.exports = router;