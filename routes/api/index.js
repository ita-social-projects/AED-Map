const URL = 'https://maps.googleapis.com/maps/api/place';
const revURL =
  'https://maps.googleapis.com/maps/api/geocode/json';
const axios = require('axios');

const getGeocodingOptions = (value) => {
  return axios.get(
    `${URL}/autocomplete/json?input=${encodeURI(value)}`,
    {
      params: {
        key: process.env.GOOGLE_API_KEY,
        sessiontoken: '1234567898'
      }
    }
  );
};
const getGeocodingDetails = (id) => {
  return axios.get(`${URL}/details/json`, {
    params: {
      place_id: id,
      fields: 'geometry',
      key: process.env.GOOGLE_API_KEY
    }
  });
};
const getReverseGeocoding = (lng, lat) => {
  return axios.get(`${revURL}`, {
    params: {
      latlng: `${lat},${lng}`,
      key: process.env.GOOGLE_API_KEY,
      language: 'uk'
    }
  });
};

module.exports = {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
};
