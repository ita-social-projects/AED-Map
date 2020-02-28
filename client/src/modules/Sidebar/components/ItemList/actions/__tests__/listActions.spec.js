import * as types from '../../consts';
import * as actions from '../list';

import {
  mockData,
  mockError
} from '../../../../../../mocks';

describe('defibrillator LOAD actions', () => {
  it(`should create action to ${types.START_LOAD_DATA}`, () => {
    const expectedAction = {
      type: types.START_LOAD_DATA
    };
    expect(actions.startLoadDef()).toEqual(expectedAction);
  });

  it(`should create action to ${types.SUCCESS_LOAD_DATA}`, () => {
    const expectedAction = {
      type: types.SUCCESS_LOAD_DATA,
      payload: mockData
    };
    expect(actions.successLoadDef(mockData)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.FAIL_LOAD_DATA}`, () => {
    const expectedAction = {
      type: types.FAIL_LOAD_DATA,
      payload: mockError
    };
    expect(actions.failLoadDef(mockError)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.SET_DATA}`, () => {
    const expectedAction = {
      type: types.SET_DATA,
      payload: mockData
    };
    expect(actions.setData(mockData)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.SET_ACTIVE}`, () => {
    const expectedAction = {
      type: types.SET_ACTIVE,
      payload: mockData.listDefs._id
    };
    expect(
      actions.setActive(mockData.listDefs._id)
    ).toEqual(expectedAction);
  });

  it(`should create action to ${types.SET_PAGE}`, () => {
    const expectedAction = {
      type: types.SET_PAGE,
      payload: 1
    };
    expect(actions.setPage(1)).toEqual(expectedAction);
  });
  it(`should create action to ${types.SET_PER_PAGE}`, () => {
    const expectedAction = {
      type: types.SET_PER_PAGE,
      payload: 20
    };
    expect(actions.setPerPage(20)).toEqual(expectedAction);
  });
});
