import { SET_USER_POSITION,
  SET_GEOLOCATION_STATUS,
  START_WATCHING_POSITION,
} from "../consts"


/* 
 * Set user position manually.
 */
export const setUserPosition = (payload) => {
  return {
    type: SET_USER_POSITION,
    payload: payload
  }
}

/*
 * Sets user location based on getCurrentPosition function, 
 */
export const setGeolocation = () => {
  return (dispatch) => {
    const error = (e) => {
      console.log(e)
      dispatch({type: SET_GEOLOCATION_STATUS, payload: false});
    }
    const success = ({ coords }) => {
      const { latitude, longitude} = coords;
      dispatch({type: SET_USER_POSITION, payload: {lat: latitude, lng: longitude}});
      dispatch({type: SET_GEOLOCATION_STATUS, payload: true});
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

/*
 * Start constantly updating user location
 */
export const startWatchingPosition = () => {
  return (dispatch, getState) => {
    if (getState.watchId) {
      return
    }
    const error = (e) => {
      dispatch({type: SET_GEOLOCATION_STATUS, payload: false});
    }

    const success = ({ coords }) => {
      const { latitude, longitude} = coords;
      dispatch({type: SET_USER_POSITION, payload: {lat: latitude, lng: longitude}});
      dispatch({type: SET_GEOLOCATION_STATUS, payload: true});
    }
    const id = navigator.geolocation.watchPosition(success, error, {timeout:60000})
    dispatch({type: START_WATCHING_POSITION, payload: id});
  }
}

/*
 * Set boolean value either geolocation working or not.
 */
export const setGeolocationStatus = (payload) => {
  return {
    type: SET_GEOLOCATION_STATUS,
    payload: payload
  }
}

/*
 * Stops constantly updating user location.
 */
export const stopWatching = () => {
  return {
    type: SET_USER_POSITION
  }
}