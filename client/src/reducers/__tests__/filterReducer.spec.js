import filterReducer from '../filterReducer';
import * as types from '../../consts/filter';

import { mockFilter } from '../../mocks';

const initialState = '';
describe('filter reducer', () => {
  it('should return initial state', () => {
    expect(filterReducer(undefined, {})).toEqual(
      initialState
    );
  });

  it(`should handle ${types.SET_FILTER} action`, () => {
    expect(
      filterReducer(initialState, {
        type: types.SET_FILTER,
        filter: mockFilter
      })
    ).toEqual(mockFilter);
  });
});
