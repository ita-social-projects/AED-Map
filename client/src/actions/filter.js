import { SET_FILTER } from '../consts/filter';

// eslint-disable-next-line import/prefer-default-export
export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
}
