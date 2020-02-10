import http from '../../../shared/http';

const URL = 'api/defibrillators';

export const fetchDefItems = (params, cancelToken) => {
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
export const deleteItem = id => {
  return http.delete(`${URL}/${id}`);
};
