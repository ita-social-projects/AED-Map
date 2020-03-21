import * as types from '../../consts';
import * as actions from '../index';

import { mockSearch } from '../../../../../../mocks';

describe('search actions', () => {
  it(`should create action to ${types.SET_SEARCH}`, () => {
    const expectedAction = {
      type: types.SET_SEARCH,
      payload: mockSearch
    };

    expect(actions.setSearch(mockSearch)).toEqual(
      expectedAction
    );
  });
});
