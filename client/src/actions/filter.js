import { SET_FILTER } from '../consts/filter';

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter,
  };
}
