import { SET_MAP_CENTER, SET_MAP_ZOOM } from '../consts';

export const setMapCenter = mapState => {
  return {
    type: SET_MAP_CENTER,
    payload: mapState
  };
};

export const setMapZoom = zoom => {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  };
};
