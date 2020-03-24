import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as types from '../../consts';
import * as actions from '../list';
import {
  mockNewDefInfo,
  mockError
} from '../../../../../../mocks';

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
      {
        type: types.CREATE_DEF_POINT,
        payload: mockNewDefInfo
      }
    ];
    return store
      .dispatch(actions.createDefItem(mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.FAIL_LOAD_DATA} when new def added fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      {
        type: types.FAIL_LOAD_DATA,
        payload: mockError
      }
    ];
    return store
      .dispatch(actions.createDefItem())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.DELETE_DEF_POINT} when def item deleted`, () => {
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
      {
        type: types.DELETE_DEF_POINT,
        payload: id
      },
      {
        type: types.CLEAR_DATA
      },
      {
        type: types.START_LOAD_DATA
      },
      {
        type: types.SET_PAGE,
        payload: undefined
      }
    ];

    return store
      .dispatch(actions.deleteDefItem(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.FAIL_LOAD_DATA} when def item delete fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      {
        type: types.FAIL_LOAD_DATA,
        payload: mockError
      }
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
      {
        type: types.EDIT_DEF_POINT,
        payload: {
          id,
          newDefInfo: mockNewDefInfo
        }
      }
    ];
    return store
      .dispatch(actions.editDefItem(id, mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`creates ${types.FAIL_LOAD_DATA} when def item edit fails`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      {
        type: types.FAIL_LOAD_DATA,
        payload: mockError
      }
    ];
    return store
      .dispatch(actions.editDefItem(id, mockNewDefInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
