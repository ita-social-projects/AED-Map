import defReducer from '../defReducer';
import * as types from '../../consts/def';
import { mockData, mockError } from '../../mocks';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

describe('defibrillators LOAD part reducer', () => {
  it('should return initial state', () => {
    expect(defReducer(undefined, {})).toEqual(initialState);
  });
  it('should return initial state if action type is incorrect', () => {
    expect(
      defReducer(initialState, {
        type: 'INCORRECT_ACTION',
      }),
    ).toEqual(initialState);
  });

  it(`should handle ${types.START_LOAD_DEF} action`, () => {
    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(
      defReducer(initialState, {
        type: types.START_LOAD_DEF,
      }),
    ).toEqual(expectedState);
  });

  it(`should handle ${types.FAIL_LOAD_DEF} action`, () => {
    const expectedState = {
      ...initialState,
      error: mockError,
    };

    expect(
      defReducer(initialState, {
        type: types.FAIL_LOAD_DEF,
        error: mockError,
      }),
    ).toEqual(expectedState);
  });

  it(`should handle ${types.SUCCESS_LOAD_DEF}`, () => {
    const expected = {
      ...initialState,
      data: mockData,
    };

    expect(
      defReducer(initialState, {
        type: types.SUCCESS_LOAD_DEF,
        defs: mockData,
      }),
    ).toEqual(expected);
  });

  it(`should have length ${mockData.length} if handle SUCCESS_LOAD`, () => {
    const data = defReducer(initialState, {
      type: types.SUCCESS_LOAD_DEF,
      defs: mockData,
    });
    expect(data.data.length).toBe(mockData.length);
  });
});
