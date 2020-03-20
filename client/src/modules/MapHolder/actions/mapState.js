import {
  ADD_NEW_POINT,
  SET_MAP_CENTER,
  SET_MAP_ZOOM
} from '../consts';

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

export const addNewPoint = newPoint => {
  return {
    type: ADD_NEW_POINT,
    payload: newPoint
  };
};
