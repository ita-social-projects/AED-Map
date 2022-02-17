import { SET_UNTIL_TIME } from '../consts';

const initialState = {
  timeUntil: '00:00'
};

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_UNTIL_TIME:
      return {
        ...state,
        timeUntil: payload
      }
    default:
      return state;
  }
}
