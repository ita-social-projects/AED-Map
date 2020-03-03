import http from '../http';

const URL = 'api/gmap';

const getGeocodingOptions = value => {
  return http.get(`${URL}/options/${value}`);
};
const getGeocodingDetails = id => {
  return http.get(`${URL}/details/${id}`);
};

export { getGeocodingOptions, getGeocodingDetails };
