import http from '../../../shared/http';

const URL = '/api/defibrillators';
const URLimage = '/api/images';

export const getDefItems = (params, cancelToken) => {
  return http.get(URL, params, cancelToken);
};
export const fetchSingleDefById = id => {
  return http.get(`${URL}/${id}`);
};
export const createItem = params => {
  return http.post(URL, params);
};
export const editItem = params => {
  return http.put(`${URL}/${params._id}`, params);
};
export const blockItem = (id, params) => {
  return http.put(`${URL}/block/${id}`, params);
};
export const deleteItem = id => {
  return http.delete(`${URL}/${id}`);
};

export const createImage = (params, defibrillatorId) => {
  return http.postFormData(`${ URLimage}/${defibrillatorId}`, params);
};
export const deleteImage = (imageId, defibrillatorId) => {
  return http.delete(`${URLimage}/${defibrillatorId}/${imageId}`);
};
