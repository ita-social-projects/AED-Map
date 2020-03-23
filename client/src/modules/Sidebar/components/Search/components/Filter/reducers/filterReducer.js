import { SET_FILTER, RESET_FILTER } from '../consts';

const initialState = null;

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_FILTER:
      return payload;
    case RESET_FILTER:
      return null;
    default:
      return state;
  }
};
