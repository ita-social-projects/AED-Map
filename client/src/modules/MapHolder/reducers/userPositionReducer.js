import { SET_USER_POSITION,
  START_WATCHING_POSITION,
  STOP_WATCHING_POSITION,
  SET_GEOLOCATION_STATUS,
} from "../consts"

const initialState = {
  coords: {
    lng: null,
    lat: null,
  },
  watchId: null,
  geolocationProvided: false,
}

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_USER_POSITION:
      const { lng, lat } = payload;
      return {...state, coords: {lng, lat}};

    case START_WATCHING_POSITION:
      if (state.watchId === null) {
        return {...state, watchId: payload}
      } else {
        return state
      }
    
    case STOP_WATCHING_POSITION:
      if (state.watchId !== null) {
        navigator.geolocation.clearWatch(state.watchId);
      }
      return {...state, watchId: null}

    case SET_GEOLOCATION_STATUS:
      return {...state, geolocationProvided: payload}
      
    default: 
      return state
  }
}