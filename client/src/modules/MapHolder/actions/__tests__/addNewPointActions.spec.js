import * as types from '../../consts';

import * as actions from '../mapState';

import { mockNewPoint } from '../../../../mocks';

describe('mapState actions', () => {
  it(`should create action to ${types.ADD_NEW_POINT}`, () => {
    const expectedAction = {
      type: types.ADD_NEW_POINT,
      payload: mockNewPoint
    };

    expect(actions.addNewPoint(mockNewPoint)).toEqual(
      expectedAction
    );
  });
});
