import * as types from '../../consts';

import * as actions from '../popupDisplay';

import { mockCurrDef } from '../../../../mocks';

describe('mapState actions', () => {
  it(`should create action to ${types.SHOW_POPUP}`, () => {
    const expectedAction = {
      type: types.SHOW_POPUP,
      payload: mockCurrDef
    };
    expect(actions.showPopup(mockCurrDef)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.HIDE_POPUP}`, () => {
    const expectedAction = {
      type: types.HIDE_POPUP
    };
    expect(actions.hidePopup()).toEqual(expectedAction);
  });
});
