import listReducer, {
  defsSearchSelector
} from '../listReducer';
import * as types from '../../consts';

import {
  mockState,
  mockFilter,
  mockNewDefInfo
} from '../../../../../../mocks';

const initialState = {
  loading: false,
  error: null,
  data: [],
  page: 1,
  perPage: 10
};

describe('defibrillators CRUD part', () => {
  it(`should handle ${types.CREATE_DEF_POINT} action`, () => {
    const expectedState = {
      ...initialState,
      data: [mockNewDefInfo, ...initialState.data]
    };

    expect(
      listReducer(initialState, {
        type: types.CREATE_DEF_POINT,
        payload: mockNewDefInfo
      })
    ).toEqual(expectedState);
  });

  it(`should have length ${mockState.data.length} when ${types.CREATE_DEF_POINT} action have`, () => {
    const res = listReducer(initialState, {
      type: types.CREATE_DEF_POINT,
      payload: mockNewDefInfo
    });
    expect(res.data.length).toBe(
      initialState.data.length + 1
    );
  });

  it(`should handle ${types.DELETE_DEF_POINT} action`, () => {
    const id = 'fdsmgfkgt88gt';
    const expectedState = {
      ...initialState,
      data: initialState.data.filter(def => def.id !== id)
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
    expect(res.data.length).toBe(mockState.data.length - 1);
  });

  it(`should handle ${types.EDIT_DEF_POINT}`, () => {
    const id = '576uyjty';
    const expectedState = {
      ...initialState,
      data: mockState.data.map(def => {
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
    mockState.data[0].id = id;
    mockState.data[0]._id = id;
    const expectedState = {
      ...initialState,
      data: mockState.data.map(def => {
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
          ...mockState.data,
          title: 'mock title'
        }
      }
    });
    expect(res.data[0].title).toBe(
      expectedState.data[0].title
    );
  });

  it(`should have the same length when ${types.EDIT_DEF_POINT} handle`, () => {
    const id = '576uyjty';
    const expectedState = {
      ...initialState,
      data: mockState.data.map(def => {
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
    expect(res.data.length).toEqual(
      expectedState.data.length
    );
  });

  it('should create defsSearchSelector function', () => {
    const fullState = {
      defs: mockState,
      filter: mockFilter
    };
    const filteredDefs = defsSearchSelector(fullState);
    expect(filteredDefs.length).toBeTruthy();
  });
});
