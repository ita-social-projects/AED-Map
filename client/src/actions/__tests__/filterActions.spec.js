import * as types from '../../consts/filter';
import * as actions from '../filter';

import { mockFilter } from '../../mocks';

describe('filter actions', () => {
  it(`should create action to ${types.SET_FILTER}`, () => {
    const expectedAction = {
      type: types.SET_FILTER,
      filter: mockFilter
    };
    expect(actions.setFilter(mockFilter)).toEqual(
      expectedAction
    );
  });
});
