import * as types from '../../consts/map';
import * as actions from '../map';

import { mockMap } from '../../mocks';

describe('filter actions', () => {
  it(`should create action to ${types.SET_MAP}`, () => {
    const expectedAction = {
      type: types.SET_MAP,
      map: mockMap,
    };
    expect(actions.setMap(mockMap)).toEqual(expectedAction);
  });
});
