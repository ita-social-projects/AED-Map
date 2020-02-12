import http from '../../shared/http';

const URL = '/api/auth';

export function signInUser(data) {
  return http.post(`${URL}/signin`, data);
}

export function signUpUser(data) {
  return http.post(`${URL}/signup`, data);
}

export function validateUser(data) {
  return http.get(`${URL}/validate`, data);
}
