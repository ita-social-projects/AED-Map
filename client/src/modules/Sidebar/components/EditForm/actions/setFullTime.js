import { SET_FULL_TIME,SET_FROM_TIME,SET_UNTIL_TIME } from '../consts';
/* eslint-disable import/prefer-default-export */
export function setFullTime(value) {
  return {
    type: SET_FULL_TIME,
    payload: value
  };
}

export function setFromTime(value) {
  return {
    type: SET_FROM_TIME,
    payload: value
  };
}
export function setUntilTime(value) {
  return {
    type: SET_UNTIL_TIME,
    payload: value
  };
}