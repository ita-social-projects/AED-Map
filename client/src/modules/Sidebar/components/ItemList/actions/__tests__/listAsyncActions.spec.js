import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as types from '../../consts';
import * as actions from '../list';
import {
  mockData,
  mockError
} from '../../../../../../mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSuccessResponse = data => ({
  status: 200,
  response: data
});
const mockErrorResponse = error => ({
  status: 500,
  response: error
});

describe('fetchDefs action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`creates ${types.SUCCESS_LOAD_DATA} when fetching defs has been done`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccessResponse(mockData));
    });
    const store = mockStore({ data: [] });
    const expectedActions = [
      { type: types.START_LOAD_DATA },
      {
        type: types.SET_PAGE,
        payload: undefined
      },
      {
        type: types.SUCCESS_LOAD_DATA,
        payload: mockData
      }
    ];

    return store.dispatch(actions.fetchDefs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should have payload data when fetching defs has been done', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccessResponse(mockData));
    });
    const store = mockStore({ data: [] });

    return store.dispatch(actions.fetchDefs()).then(() => {
      expect(
        store.getActions()[2].payload.listDefs.length
      ).toEqual(3);
      expect(
        store.getActions()[2].payload.mapDefs.length
      ).toEqual(1);
    });
  });

  it(`creates ${types.FAIL_LOAD_DATA} when fetching defs failed`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    const expectedActions = [
      { type: types.START_LOAD_DATA },
      { type: types.SET_PAGE, payload: undefined },
      {
        type: types.FAIL_LOAD_DATA,
        payload: mockError
      }
    ];
    return store.dispatch(actions.fetchDefs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should have error payload when fetching defs failed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockErrorResponse(mockError));
    });
    const store = mockStore({ error: null });
    return store.dispatch(actions.fetchDefs()).then(() => {
      expect(store.getActions()[2].payload).toBeTruthy();
    });
  });
});
