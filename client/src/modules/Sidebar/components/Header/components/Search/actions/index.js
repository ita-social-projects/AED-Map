import { SET_SEARCH} from '../consts';
/* eslint-disable import/prefer-default-export */
export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search
  };
}