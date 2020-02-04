import { SET_FILTER, RESET_FILTER } from '../consts';

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}

export function resetFilter() {
  return {
    type: RESET_FILTER
  };
}
