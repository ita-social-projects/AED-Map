import { SET_FULL_TIME,SET_FROM_TIME,SET_UNTIL_TIME } from '../consts';

export const initialState = {
  fullTime: false,
  timeFrom: 0,
  timeUntil: 0
};

export default function (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FULL_TIME:
      return {
        ...state,
        fullTime: payload
      }
    case SET_FROM_TIME:
      return {
        ...state,
        timeFrom: payload
      }
    case SET_UNTIL_TIME:
      return {
        ...state,
        timeUntil: payload
      }
    default:
      return state;
  }
}
