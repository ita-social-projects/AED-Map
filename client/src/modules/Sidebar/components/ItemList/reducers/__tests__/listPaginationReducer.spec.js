import listReducer from '../listReducer';
import * as types from '../../consts';

import { mockData } from '../../../../../../mocks';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: 1,
  perPage: 10,
  totalCount: 0
};

describe('defibrillators pagination part reducer', () => {
  it(`should handle ${types.SET_DATA} action`, () => {
    const expectedState = {
      ...initialState,
      data: mockData
    };
    expect(
      listReducer(initialState, {
        type: types.SET_DATA,
        payload: mockData
      })
    ).toEqual(expectedState);
  });
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
  it('should return page value 1 when payload is undefined', () => {
    const res = listReducer(initialState, {
      type: types.SET_PAGE
    });
    expect(res.page).toEqual(initialState.page + 1);
  });
  it('should return totalCount value 1 when payload equal 1', () => {
    const expectedState = {
      ...initialState,
      page: 1
    };
    const res = listReducer(expectedState, {
      type: types.SET_PAGE,
      payload: 1
    });
    expect(res.totalCount).toEqual(0);
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
