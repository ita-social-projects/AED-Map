import http from '../../shared/http';

const URL = '/api/auth';

export const signInUser = data => {
  return http.post(`${URL}/signin`, data);
};

export function signUpSendmail(data) {
  return http.post(`${URL}/signup/sendmail`, data);
}

export function signUpUser(data) {
  return http.post(`${URL}/signup`, data);
};

export function resetSendmail(data) {
  return http.post(`${URL}/reset/sendmail`, data);
}

export function resetUser(data) {
  return http.post(`${URL}/reset`, data);
};

export const validateUser = data => {
  return http.get(`${URL}/validate`, data);
};
