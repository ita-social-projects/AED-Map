import { SET_FROM_TIME } from '../consts';

const initialState = {
  timeFrom: '00:00'
};

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FROM_TIME:
      return {
        ...state,
        timeFrom: payload
      }
    default:
      return state;
  }
}
