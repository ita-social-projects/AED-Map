import { SET_MAP_CENTER, SET_MAP_ZOOM } from '../consts';

const initialState = {
  lng: 24.0311,
  lat: 49.842,
  zoom: 12.5
};
export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_MAP_CENTER: {
      if (
        state.lng === payload.lng &&
        state.lat === payload.lat
      ) {
        return state;
      }
      return { ...state, ...payload }; // here payload is {lng: number, lat: number}
    }
    case SET_MAP_ZOOM: {
      return { ...state, zoom: payload }; // here payload is number
    }
    default:
      return state;
  }
};
