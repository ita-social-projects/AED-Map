import { SET_MAP } from '../consts/map';

export function setMap(map) {
  return {
    type: SET_MAP,
    map
  };
}
