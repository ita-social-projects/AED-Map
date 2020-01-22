import defReducer from '../defReducer';
import * as types from '../../consts/def';

import { mockData, mockNewDefInfo } from '../../mocks';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

describe('defibrillators CRUD part reducer', () => {
  it(`should handle ${types.CREATE_DEF_POINT} action`, () => {
    const expectedState = {
      ...initialState,
      data: [...initialState.data, mockNewDefInfo],
    };

    expect(
      defReducer(initialState, {
        type: types.CREATE_DEF_POINT,
        newDef: mockNewDefInfo,
      }),
    ).toEqual(expectedState);
  });
  it(`should have length ${mockData.length} when ${types.CREATE_DEF_POINT} action have`, () => {
    const expectedState = {
      ...initialState,
      data: [...initialState.data, mockNewDefInfo],
    };

    const res = defReducer(initialState, {
      type: types.CREATE_DEF_POINT,
      newDef: mockNewDefInfo,
    });
    expect(res.data.length).toBe(expectedState.data.length);
  });

  it(`should handle ${types.DELETE_DEF_POINT} action`, () => {
    const id = 'fdsmgfkgt88gt';
    const expectedState = {
      ...initialState,
      data: initialState.data.filter(
        (def) => def.id !== id,
      ),
    };

    expect(
      defReducer(initialState, {
        type: types.DELETE_DEF_POINT,
        id,
      }),
    ).toEqual(expectedState);
  });

  it(`should delete def item when ${types.DELETE_DEF_POINT} action handle`, () => {
    const id = '423432fsd4';
    const mockState = { ...initialState, data: mockData };

    const res = defReducer(mockState, {
      type: types.DELETE_DEF_POINT,
      id,
    });
    expect(res.data.length).toBe(mockState.data.length - 1);
  });

  it(`should handle ${types.EDIT_DEF_POINT}`, () => {
    const id = '576uyjty';
    const expectedState = {
      ...initialState,
      data: mockData.map((def) => {
        if (def.id === id) {
          return { ...def, ...mockNewDefInfo };
        }
        return def;
      }),
    };

    expect(
      defReducer(
        { ...initialState, data: mockData },
        {
          type: types.EDIT_DEF_POINT,
          id,
          newDefInfo: mockNewDefInfo,
        },
      ),
    ).toEqual(expectedState);
  });
});
