import {
  START_SIGNIN,
  SUCCESS_SIGNIN,
  FAIL_SIGNIN,
  SIGNOUT
} from '../const';

const initialState = {
  loading: false,
  user: null
};

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case START_SIGNIN:
      return {
        loading: true,
        user: null
      };
    case SUCCESS_SIGNIN:
      return {
        loading: false,
        user: payload
      };
    case FAIL_SIGNIN:
    case SIGNOUT:
      return {
        loading: false,
        user: null
      };
    default:
      return state;
  }
};
