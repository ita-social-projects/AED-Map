import http from '../../../shared/http';

const URL = 'api/defibrillators';
export function fetchDefItems() {
  return http.get(URL);
}
export function createItem(data) {
  return http.post(URL, data);
}
export function editItem(id, data) {
  return http.put(`${URL}/${id}`, { id }, data);
}
export function deleteItem(id) {
  return http.delete(`${URL}/${id}`, { id });
}
