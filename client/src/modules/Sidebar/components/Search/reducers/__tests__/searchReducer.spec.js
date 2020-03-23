import searchReducer from '../index';
import * as types from '../../consts';

import { mockSearch } from '../../../../../../mocks';

const initialState = { address: '' };
describe('search reducer', () => {
  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(
      initialState
    );
  });

  it(`should handle ${types.SET_SEARCH} action`, () => {
    expect(
      searchReducer(initialState, {
        type: types.SET_SEARCH,
        payload: mockSearch
      })
    ).toEqual(mockSearch);
  });
});
