import * as types from '../../consts';
import * as actions from '../list';

import { mockNewDefInfo } from '../../../../../../mocks';

describe('defibrillator CRUD actions', () => {
  it(`should create action to ${types.CREATE_DEF_POINT}`, () => {
    const expectedAction = {
      type: types.CREATE_DEF_POINT,
      payload: mockNewDefInfo
    };
    expect(actions.createDefPoint(mockNewDefInfo)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.DELETE_DEF_POINT}`, () => {
    const uniqueId = 'dsafdgtkvc.56571233';
    const expectedAction = {
      type: types.DELETE_DEF_POINT,
      payload: uniqueId
    };

    expect(actions.deleteDefPoint(uniqueId)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.EDIT_DEF_POINT}`, () => {
    const expectedAction = {
      type: types.EDIT_DEF_POINT,
      payload: {
        id: mockNewDefInfo.id,
        newDefInfo: mockNewDefInfo
      }
    };
    expect(
      actions.editDefPoint(
        mockNewDefInfo.id,
        mockNewDefInfo
      )
    ).toEqual(expectedAction);
  });
});
