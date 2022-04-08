import * as types from '../consts';
import * as actions from '../actions/setFullTime'

describe('set time action', () => {
  it(`should create action to ${types.SET_FULL_TIME}`, () => {
    const expectedAction = {
      type: types.SET_FULL_TIME,
      payload: true,
    };
    expect(actions.setFullTime(true)).toEqual(expectedAction);
  });

  it(`should create action to ${types.SET_FROM_TIME}`, () => {
    const expectedAction = {
      type: types.SET_FROM_TIME,
      payload: '01:00',
    };
    expect(actions.setFromTime('01:00')).toEqual(expectedAction);
  });

  it(`should create action to ${types.SET_UNTIL_TIME}`, () => {
    const expectedAction = {
      type: types.SET_UNTIL_TIME,
      payload: '01:00',
    };
    expect(actions.setUntilTime('01:00')).toEqual(expectedAction);
  });
});
