import { ADD_NEW_POINT } from '../consts';

const initialState = {};

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_NEW_POINT: {
      if (
        payload &&
        state.lng === payload.lng &&
        state.lat === payload.lat
      ) {
        return state;
      }
      return { ...payload };
    }
    default:
      return state;
  }
};
