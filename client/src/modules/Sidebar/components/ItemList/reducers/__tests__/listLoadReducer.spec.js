import listReducer from '../listReducer';
import * as types from '../../consts';

import {
  mockData,
  mockError
} from '../../../../../../mocks';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: 1,
  perPage: 10,
  totalCount: 0
};

describe('defibrillators LOAD part reducer', () => {
  it('should return initial state', () => {
    expect(listReducer(undefined, {})).toEqual(
      initialState
    );
  });
  it('should return initial state if action type is incorrect', () => {
    expect(
      listReducer(initialState, {
        type: 'INCORRECT_ACTION'
      })
    ).toEqual(initialState);
  });

  it(`should handle ${types.START_LOAD_DATA} action`, () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    expect(
      listReducer(initialState, {
        type: types.START_LOAD_DATA
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.FAIL_LOAD_DATA} action`, () => {
    const expectedState = {
      ...initialState,
      error: mockError
    };

    expect(
      listReducer(initialState, {
        type: types.FAIL_LOAD_DATA,
        payload: mockError
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.SUCCESS_LOAD_DATA}`, () => {
    const expected = {
      ...initialState,
      data: mockData
    };

    expect(
      listReducer(initialState, {
        type: types.SUCCESS_LOAD_DATA,
        payload: { defibrillators: mockData, totalCount: 0 }
      })
    ).toEqual(expected);
  });

  it(`should have length ${mockData.length} if handle SUCCESS_LOAD`, () => {
    const data = listReducer(initialState, {
      type: types.SUCCESS_LOAD_DATA,
      payload: { defibrillators: mockData, totalCount: 0 }
    });
    expect(data.data.length).toBe(mockData.length);
  });
});
