import { SET_SEARCH } from '../consts';

const initialState = {
  address: ''
};

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_SEARCH:
      return payload;
    default:
      return state;
  }
}
