import mapStateReducer from '../mapStateReducer';
import * as types from '../../consts';

import { mockMap } from '../../../../mocks';
// it's also initital map state
const initialState = {
  lng: 24.02,
  lat: 24.22
};
describe('map reducer', () => {
  it('should return initial state', () => {
    expect(mapStateReducer(undefined, {})).toEqual(mockMap);
  });

  it(`should handle ${types.SET_MAP_CENTER} action`, () => {
    const expectedState = {
      ...initialState,
      ...mockMap
    };
    expect(
      mapStateReducer(initialState, {
        type: types.SET_MAP_CENTER,
        payload: mockMap
      })
    ).toEqual(expectedState);
  });

  it('should return the same center when coords are the same', () => {
    const sameMap = {
      ...initialState,
      lng: mockMap.lng,
      lat: mockMap.lat
    };
    expect(
      mapStateReducer(sameMap, {
        type: types.SET_MAP_CENTER,
        payload: mockMap
      })
    ).toEqual(sameMap);
  });

  it(`should handle ${types.SET_MAP_ZOOM} action`, () => {
    const expectedState = {
      ...mockMap,
      zoom: 18
    };
    expect(
      mapStateReducer(mockMap, {
        type: types.SET_MAP_ZOOM,
        payload: 18
      })
    ).toEqual(expectedState);
  });
});
