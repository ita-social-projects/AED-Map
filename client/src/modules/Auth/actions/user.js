import {
  START_SIGNIN,
  SUCCESS_SIGNIN,
  FAIL_SIGNIN,
  SIGNOUT
} from '../const';

export function startSignIn() {
  return {
    type: START_SIGNIN
  };
}

export function successSignIn(user, authorization) {
  localStorage.setItem('authorization', JSON.stringify(authorization));

  return {
    type: SUCCESS_SIGNIN,
    payload: user
  };
}

export function failSignIn() {
  return {
    type: FAIL_SIGNIN
  };
}

export function signOut() {
  localStorage.removeItem('authorization');

  return {
    type: SIGNOUT
  };
}
