import userPositionReducer from '../userPositionReducer';
import * as types from '../../consts';

import { mockUserPosition } from '../../../../mocks';

const initialState = {
  coords: {
    lng: null,
    lat: null,
  },
  watchId: null,
  geolocationProvided: false,
}

describe('user position reducer', () => {
  it('Should return initial state', () => {
    expect(userPositionReducer(undefined, {})).toEqual(initialState)
  });

  it(`should handle ${types.SET_USER_POSITION} action`, () => {
    const expectedState = {
      ...initialState,
      coords: mockUserPosition.coords
    }

    expect(
      userPositionReducer(initialState, {
        type: types.SET_USER_POSITION, 
        payload: mockUserPosition.coords
      })).toEqual(expectedState);
  })

  it(`should handle ${types.SET_GEOLOCATION_STATUS}`, () => {
    const expectedState = {
      ...initialState, 
      geolocationProvided: true
    }

    expect(
      userPositionReducer(initialState, {
        type: types.SET_GEOLOCATION_STATUS,
        payload: true
      })).toEqual(expectedState)
  })
})