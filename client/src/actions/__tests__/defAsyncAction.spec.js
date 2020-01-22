import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as types from '../../consts/def';
import * as actions from '../def';
import { mockData } from '../../mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchDefs action', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it(`creates ${types.SUCCESS_LOAD_DEF} when fetching defs has been done`, async () => {
    fetchMock.getOnce('/defibrillators.json', {
      body: { data: mockData },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ data: [] });
    const expectedActions = [
      { type: types.START_LOAD_DEF },
      {
        type: types.SUCCESS_LOAD_DEF,
        defs: { data: mockData },
      },
    ];
    return store
      .dispatch(actions.fetchDefs('/defibrillators.json'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should fetch data from DB and have length', async () => {
    fetchMock.getOnce('/defibrillators.json', {
      body: { data: mockData },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ data: [] });
    const res = await store.dispatch(
      actions.fetchDefs('/defibrillators.json'),
    );
    expect(res.defs.data.length).toBe(mockData.length);
  });
});
