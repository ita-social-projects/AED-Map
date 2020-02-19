import { SHOW_POPUP, HIDE_POPUP } from '../consts';

const initialState = null;

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SHOW_POPUP: {
      if (state && state.id === payload.id) {
        return state;
      }
      return {
        ...state,
        ...payload
      };
    }

    case HIDE_POPUP: {
      return null;
    }
    default:
      return state;
  }
};
