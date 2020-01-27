import { SET_FILTER, RESET_FILTER } from '../consts';

const initialState = '';

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_FILTER:
      return payload;
    case RESET_FILTER:
      return '';
    default:
      return state;
  }
}
