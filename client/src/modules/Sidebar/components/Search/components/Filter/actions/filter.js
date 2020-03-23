import { SET_FILTER, RESET_FILTER } from '../consts';

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER
  };
};
