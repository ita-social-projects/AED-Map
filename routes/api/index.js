const URL = 'https://maps.googleapis.com/maps/api/place';
const revURL =
  'https://maps.googleapis.com/maps/api/geocode/json';
const key = 'AIzaSyAeiV7W79YEl7jW_BZ9SXA4YN-pdzKqMUc';
const axios = require('axios');

const getGeocodingOptions = (value) => {
  return axios.get(
    `${URL}/autocomplete/json?input=${encodeURI(value)}`,
    {
      params: {
        key,
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
      key
    }
  });
};
const getReverseGeocoding = (lng, lat) => {
  return axios.get(`${revURL}`, {
    params: {
      latlng: `${lat},${lng}`,
      key,
      language:'uk'
    }
  });
};

module.exports = {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
};
