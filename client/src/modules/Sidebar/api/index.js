import http from '../../../shared/http';

const URL = 'api/defibrillators';

export function fetchDefItems(params, cancelToken) {
  return http.get(URL, params, cancelToken);
}
export function createItem(params) {
  return http.post(URL, params);
}
export function editItem(params) {
  // eslint-disable-next-line
  return http.put(`${URL}/${params._id}`, params);
}
export function deleteItem(id) {
  return http.delete(`${URL}/${id}`);
}
