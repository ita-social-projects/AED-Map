import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import http from '../../../../shared/http';

import * as types from '../../consts';
import {
  SET_LOADING,
  FAIL_LOAD_DATA
} from '../../components/ItemList/consts';
import * as actions from '../def';
import {
  mockNewDefInfo,
  mockError
} from '../../../../mocks';

const { id } = mockNewDefInfo;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSuccessResponse = (status = 200, data) => ({
  status,
  response: data
});
const mockErrorResponse = error => ({
  status: 500,
  response: error
});

describe('defibrillator async CRUD actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`creates ${types.CREATE_DEF_POINT} when new def added`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(
        mockSuccessResponse(201, {
          error: false,
          defibrillator: mockNewDefInfo
        })
      );
    });
    const store = mockStore({ defs: [] });
    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: types.CREATE_DEF_POINT,
        payload: mockNewDefInfo
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.createDefItem('', mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${FAIL_LOAD_DATA} when new def added fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: FAIL_LOAD_DATA,
        payload: mockError
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.createDefItem('/api/defibrillator'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.DELETE_DEF_POINT} when def item deleted`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(
        mockSuccessResponse(200, mockNewDefInfo)
      );
    });
    const store = mockStore({ defs: [] });

    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: types.DELETE_DEF_POINT,
        payload: id
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.deleteDefItem(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${FAIL_LOAD_DATA} when def item delete fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: FAIL_LOAD_DATA,
        payload: mockError
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.deleteDefItem(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.EDIT_DEF_POINT} when def item edited`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(
        mockSuccessResponse(200, {
          defibrillator: mockNewDefInfo
        })
      );
    });
    const store = mockStore({ defs: [] });

    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: types.EDIT_DEF_POINT,
        payload: {
          id,
          newDefInfo: mockNewDefInfo
        }
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.editDefItem(id, mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${FAIL_LOAD_DATA} when def item edit fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      { type: SET_LOADING, payload: true },
      {
        type: FAIL_LOAD_DATA,
        payload: mockError
      },
      { type: SET_LOADING, payload: false }
    ];
    return store
      .dispatch(actions.editDefItem(id, mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
