import mapStateReducer from '../mapStateReducer';
import * as types from '../../consts';

import { mockMap } from '../../../../mocks'; // it's also initital map state

describe('map reducer', () => {
  it('should return initial state', () => {
    expect(mapStateReducer(undefined, {})).toEqual(mockMap);
  });

  it(`should handle ${types.SET_MAP_CENTER} action`, () => {
    expect(
      mapStateReducer(mockMap, {
        type: types.SET_MAP_CENTER,
        payload: mockMap
      })
    ).toEqual(mockMap);
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
