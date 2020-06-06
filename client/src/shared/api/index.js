import http from '../http';

const host = 'http://localhost:3000';
const URL = `${host}/api/gmap`;

const getGeocodingOptions = value => {
  return http.get(`${URL}/options/${value}`);
};

const getGeocodingDetails = id => {
  return http.get(`${URL}/details/${id}`);
};

const getReverseGeocoding = lngLat => {
  return http.get(
    `${URL}/reversegeocode/${lngLat.lng}/${lngLat.lat}`
  );
};

export {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
};
