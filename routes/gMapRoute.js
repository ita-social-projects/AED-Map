const express = require('express');
const {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
} = require('./api');
const router = express.Router();

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

router.get(
  '/reversegeocode/:lng/:lat',
  async (req, res) => {
    const { lng, lat } = req.params;
    const result = await getReverseGeocoding(lng, lat);
    return res.status(200).send(result.data);
  }
);

module.exports = router;
