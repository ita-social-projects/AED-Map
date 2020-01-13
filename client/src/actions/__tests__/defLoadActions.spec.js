import * as types from '../../consts/def';
import * as actions from '../../actions/def';

import { mockData, mockError } from '../../mocks';

describe('defibrillator LOAD actions', () => {

	it(`should create action to ${types.START_LOAD_DEF}`, () => {
		const expectedAction = {
			type: types.START_LOAD_DEF
		};
		expect(actions.startLoadDef()).toEqual(expectedAction);
	});

	it(`should create action to ${types.SUCCESS_LOAD_DEF}`, () => {
		const expectedAction = {
			type: types.SUCCESS_LOAD_DEF,
			defs: mockData
		};
		expect(actions.successLoadDef(mockData)).toEqual(expectedAction);
	});

	it(`should create action to ${types.FAIL_LOAD_DEF}`, () => {
		const expectedAction = {
			type: types.FAIL_LOAD_DEF,
			error: mockError
		};
		expect(actions.failLoadDef(mockError)).toEqual(expectedAction);
	});

});