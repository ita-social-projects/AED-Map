import { SET_MAP } from '../consts/map';
const initialState = {
  lng: 24.0311,
  lat: 49.842,
  zoom: 12.5
};
export default function(map = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return action.map;
    default:
      return map;
  }
}
