import mapStateReducer from '../mapStateReducer';
import * as types from '../../consts';

import { mockMap } from '../../../../mocks'; // it's also initital map state

describe('map reducer', () => {
  it('should return initial state', () => {
    expect(mapStateReducer(undefined, {})).toEqual(mockMap);
  });

  it(`should handle ${types.SET_MAP} action`, () => {
    expect(
      mapStateReducer(mockMap, {
        type: types.SET_FILTER,
        map: mockMap
      })
    ).toEqual(mockMap);
  });
});
