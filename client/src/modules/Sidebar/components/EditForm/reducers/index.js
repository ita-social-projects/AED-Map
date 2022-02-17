import { SET_FULL_TIME,SET_FROM_TIME,SET_UNTIL_TIME } from '../consts';

const initialState = {
  fullTime: false
};

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FULL_TIME:
      return {
        ...state,
        fullTime: payload
      }
    default:
      return state;
  }
}
