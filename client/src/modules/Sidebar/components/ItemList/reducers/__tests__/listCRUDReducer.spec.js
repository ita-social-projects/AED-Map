import listReducer from '../listReducer';
import * as types from '../../consts';

import {
  mockState,
  mockNewDefInfo
} from '../../../../../../mocks';

const initialState = {
  loading: false,
  error: null,
  listData: [],
  mapData: [],
  page: 1,
  perPage: 10
};

describe('defibrillators CRUD part', () => {
  it(`should handle ${types.CREATE_DEF_POINT} action`, () => {
    const expectedState = {
      ...initialState,
      listData: [mockNewDefInfo, ...initialState.listData],
      mapData: [mockNewDefInfo, ...initialState.mapData]
    };

    expect(
      listReducer(initialState, {
        type: types.CREATE_DEF_POINT,
        payload: mockNewDefInfo
      })
    ).toEqual(expectedState);
  });

  it(`should have length ${mockState.listData.length} when ${types.CREATE_DEF_POINT} action have`, () => {
    const res = listReducer(initialState, {
      type: types.CREATE_DEF_POINT,
      payload: mockNewDefInfo
    });

    expect(res.listData.length).toBe(
      initialState.listData.length + 1
    );
  });
  it(`should handle ${types.DELETE_DEF_POINT} action`, () => {
    const id = 'fdsmgfkgt88gt';
    const expectedState = {
      ...initialState,
      listData: initialState.listData.filter(
        def => def.id !== id
      )
    };

    expect(
      listReducer(initialState, {
        type: types.DELETE_DEF_POINT,
        payload: id
      })
    ).toEqual(expectedState);
  });

  it(`should delete def item when ${types.DELETE_DEF_POINT} action handle`, () => {
    const id = '423432fsd4';

    const res = listReducer(mockState, {
      type: types.DELETE_DEF_POINT,
      payload: id
    });
    expect(res.listData.length).toBe(
      mockState.listData.length - 1
    );
  });

  it(`should handle ${types.EDIT_DEF_POINT}`, () => {
    const id = '576uyjty';
    const expectedState = {
      ...initialState,
      mapData: mockState.mapData,
      listData: mockState.listData.map(def => {
        if (def._id === id) {
          return { ...def, ...mockNewDefInfo };
        }
        return def;
      })
    };

    expect(
      listReducer(mockState, {
        type: types.EDIT_DEF_POINT,
        payload: { id, newDefInfo: mockNewDefInfo }
      })
    ).toEqual(expectedState);
  });

  it(`should edit title when ${types.EDIT_DEF_POINT} handle`, () => {
    const id = '576uyjty';
    mockState.listData[0].id = id;
    mockState.listData[0]._id = id;
    const expectedState = {
      ...initialState,
      newListData: mockState.listData.map(def => {
        if (def._id === id) {
          return { ...def, title: 'mock title' };
        }
        return def;
      })
    };
    const res = listReducer(mockState, {
      type: types.EDIT_DEF_POINT,
      payload: {
        id,
        newDefInfo: {
          ...mockState.listData,
          title: 'mock title'
        }
      }
    });
    expect(res.listData[0].title).toBe(
      expectedState.newListData[0].title
    );
  });

  it(`should have the same length when ${types.EDIT_DEF_POINT} handle`, () => {
    const id = '576uyjty';
    const expectedState = {
      ...initialState,
      newListData: mockState.listData.map(def => {
        if (def._id === id) {
          return { ...def, ...mockNewDefInfo };
        }
        return def;
      })
    };
    const res = listReducer(mockState, {
      type: types.EDIT_DEF_POINT,
      payload: { id, newDefInfo: mockNewDefInfo }
    });
    expect(res.listData.length).toEqual(
      expectedState.newListData.length
    );
  });
});
