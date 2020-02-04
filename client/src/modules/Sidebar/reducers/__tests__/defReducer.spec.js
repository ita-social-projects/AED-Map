import defReducer from '../defReducer';
import * as types from '../../consts';

import {
  mockData,
  mockNewDefInfo
} from '../../../../mocks';

const initialState = [];

describe('defibrillators CRUD part reducer', () => {
  it(`should handle ${types.CREATE_DEF_POINT} action`, () => {
    const expectedState = [...initialState, mockNewDefInfo];

    expect(
      defReducer(initialState, {
        type: types.CREATE_DEF_POINT,
        payload: mockNewDefInfo
      })
    ).toEqual(expectedState);
  });
  it(`should have length ${mockData.length} when ${types.CREATE_DEF_POINT} action have`, () => {
    const expectedState = [...initialState, mockNewDefInfo];

    const res = defReducer(initialState, {
      type: types.CREATE_DEF_POINT,
      payload: mockNewDefInfo
    });
    expect(res.length).toBe(expectedState.length);
  });

  it(`should handle ${types.DELETE_DEF_POINT} action`, () => {
    const id = 'fdsmgfkgt88gt';
    const expectedState = initialState.filter(
      def => def.id !== id
    );

    expect(
      defReducer(initialState, {
        type: types.DELETE_DEF_POINT,
        payload: id
      })
    ).toEqual(expectedState);
  });

  it(`should delete def item when ${types.DELETE_DEF_POINT} action handle`, () => {
    const id = '423432fsd4';

    const res = defReducer(mockData, {
      type: types.DELETE_DEF_POINT,
      payload: id
    });
    expect(res.length).toBe(mockData.length - 1);
  });

  it(`should handle ${types.EDIT_DEF_POINT}`, () => {
    const id = '576uyjty';
    const expectedState = mockData.map(def => {
      if (def.id === id) {
        return { ...def, ...mockNewDefInfo };
      }
      return def;
    });

    expect(
      defReducer(mockData, {
        type: types.EDIT_DEF_POINT,
        payload: { id, newDefInfo: mockNewDefInfo }
      })
    ).toEqual(expectedState);
  });
});
