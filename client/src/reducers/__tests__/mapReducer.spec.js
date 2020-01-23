import mapReducer from '../mapReducer';
import * as types from '../../consts/map';

import { mockMap } from '../../mocks'; // it's also initital map state

describe('map reducer', () => {
  it('should return initial state', () => {
    expect(mapReducer(undefined, {})).toEqual(mockMap);
  });

  it(`should handle ${types.SET_MAP} action`, () => {
    expect(
      mapReducer(mockMap, {
        type: types.SET_FILTER,
        map: mockMap
      })
    ).toEqual(mockMap);
  });
});
