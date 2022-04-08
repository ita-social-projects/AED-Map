import editReducer, {initialState} from '../reducers/';
import * as types from '../consts';

describe('set time reducer for edit page', () => {
  it(`should implement ${types.SET_FULL_TIME} type case`, () => {
    const expectedState = {
      ...initialState,
      fullTime: true,
    };
    expect(
      editReducer(initialState, {
        type: types.SET_FULL_TIME,
        payload: true,
      })
    ).toEqual(expectedState);
  });

  it(`should implement ${types.SET_FROM_TIME} type case`, () => {
    const expectedState = {
      ...initialState,
      timeFrom: 5,
    };
    expect(
      editReducer(initialState, {
        type: types.SET_FROM_TIME,
        payload: 5,
      })
    ).toEqual(expectedState);
  });

  it(`should implement ${types.SET_UNTIL_TIME} type case`, () => {
    const expectedState = {
      ...initialState,
      timeUntil: 8,
    };
    expect(
      editReducer(initialState, {
        type: types.SET_UNTIL_TIME,
        payload: 8,
      })
    ).toEqual(expectedState);
  });

  it(`should implement DEFAULT type case`, () => {
    const expectedState = initialState;

    expect(
      editReducer(initialState, {
        type: 'DEFAULT',
        payload: 8,
      })
    ).toEqual(expectedState);
  });
});