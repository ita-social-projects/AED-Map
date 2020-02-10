import * as types from '../../const';
import userReducer from '../user';

import { mockUser } from '../../../../mocks';

const initialState = {
  loading: false,
  user: null
};
describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      initialState
    );
  });

  it(`should handle ${types.START_SIGNIN} action`, () => {
    const expectedState = {
      ...initialState,
      loading: true
    };

    expect(
      userReducer(initialState, {
        type: types.START_SIGNIN
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.SUCCESS_SIGNIN} action`, () => {
    const expectedState = {
      ...initialState,
      user: mockUser
    };

    expect(
      userReducer(initialState, {
        type: types.SUCCESS_SIGNIN,
        payload: mockUser
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.FAIL_SIGNIN} action`, () => {
    const expectedState = {
      ...initialState
    };

    expect(
      userReducer(initialState, {
        type: types.FAIL_SIGNIN
      })
    ).toEqual(expectedState);
  });

  it(`should handle ${types.SIGNOUT} action`, () => {
    const expectedState = {
      ...initialState
    };

    expect(
      userReducer(initialState, {
        type: types.SIGNOUT
      })
    ).toEqual(expectedState);
  });
});
