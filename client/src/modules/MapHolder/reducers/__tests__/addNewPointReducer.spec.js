import addNewPointReducer from '../addNewPointReducer';
import * as types from '../../consts';

import { mockNewPoint } from '../../../../mocks';

const initialState = {};

describe('add new point reducer', () => {
  it('should return initial state', () => {
    expect(addNewPointReducer(undefined, {})).toEqual(
      initialState
    );
  });

  it('should return state when coords are the same', () => {
    const previousState = mockNewPoint;

    expect(
      addNewPointReducer(previousState, {
        type: types.ADD_NEW_POINT,
        payload: mockNewPoint
      })
    ).toEqual(previousState);
  });

  it(`should handle ${types.ADD_NEW_POINT} action`, () => {
    const expectedState = {
      lng: 23.523701,
      lat: 49.28061
    };

    expect(
      addNewPointReducer(mockNewPoint, {
        type: types.ADD_NEW_POINT,
        payload: expectedState
      })
    ).toEqual(expectedState);
  });
});
