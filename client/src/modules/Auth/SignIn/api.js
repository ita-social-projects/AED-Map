import http from '../../../shared/http';

const URL = '/api/auth';
export function registerUser(data) {
  return http.post(`${URL}/register`, data);
}
export function loginUser(data) {
  return http.post(`${URL}/login`, data);
}
