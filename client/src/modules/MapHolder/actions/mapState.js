import { SET_MAP_CENTER, SET_MAP_ZOOM } from '../consts';

export function setMapCenter(mapState) {
  return {
    type: SET_MAP_CENTER,
    payload: mapState
  };
}

export function setMapZoom(zoom) {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  };
}
