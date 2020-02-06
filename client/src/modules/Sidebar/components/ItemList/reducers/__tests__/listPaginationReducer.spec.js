import listReducer from '../listReducer';
import * as types from '../../consts';

// import {
//   mockState,
//   mockError
// } from '../../../../../../mocks';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: 1,
  perPage: 10
};

describe('defibrillators pagination part reducer', () => {
  it(`should handle ${types.SET_PAGE} action`, () => {
    const expectedState = {
      ...initialState,
      page: 2
    };
    expect(
      listReducer(initialState, {
        type: types.SET_PAGE,
        payload: 2
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.SET_PER_PAGE} action`, () => {
    const expectedState = {
      ...initialState,
      perPage: 15
    };
    expect(
      listReducer(initialState, {
        type: types.SET_PER_PAGE,
        payload: 15
      })
    ).toEqual(expectedState);
  });
});
