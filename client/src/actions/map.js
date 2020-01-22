import { SET_MAP } from '../consts/map';
// eslint-disable-next-line import/prefer-default-export
export function setMap(map) {
  return {
    type: SET_MAP,
    map,
  };
}
