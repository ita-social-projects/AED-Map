import popupDisplayReducer from '../popupDisplayReducer';
import * as types from '../../consts';

import { mockCurrDef } from '../../../../mocks';

describe('map reducer', () => {
  it('should return initial state', () => {
    expect(popupDisplayReducer(undefined, {})).toEqual(
      null
    );
  });

  it(`should handle ${types.SHOW_POPUP} action`, () => {
    const payload = {
      id: 'someID',
      coordinates: [1, 1]
    };
    expect(
      popupDisplayReducer(mockCurrDef, {
        type: types.SHOW_POPUP,
        payload
      })
    ).toEqual({ ...payload });
  });

  it(`should handle ${types.HIDE_POPUP} action`, () => {
    expect(
      popupDisplayReducer(mockCurrDef, {
        type: types.HIDE_POPUP
      })
    ).toEqual(null);
  });
});
