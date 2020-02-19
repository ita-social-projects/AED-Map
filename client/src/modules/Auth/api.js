import http from '../../shared/http';

const URL = '/api/auth';

export const signInUser = data => {
  return http.post(`${URL}/signin`, data);
};

export const signUpUser = data => {
  return http.post(`${URL}/signup`, data);
};

export const validateUser = data => {
  return http.get(`${URL}/validate`, data);
};
