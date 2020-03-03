const express = require('express');
const axios = require('axios');
const {
  getGeocodingOptions,
  getGeocodingDetails
} = require('./api');
const router = express.Router();
const url = encodeURI(
  'https://maps.googleapis.com/maps/api/place'
);

router.get('/options/:value', async (req, res) => {
  const { value } = req.params;
  const result = await getGeocodingOptions(value);
  return res.status(200).send(result.data);
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getGeocodingDetails(id);
  return res.status(200).send(result.data);
});

module.exports = router;