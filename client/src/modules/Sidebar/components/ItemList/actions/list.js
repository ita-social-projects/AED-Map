import {
  SET_LOADING,
  SUCCESS_LOAD_DATA,
  FAIL_LOAD_DATA,
  SET_PAGE,
  SET_PER_PAGE
} from '../consts';
import { fetchDefItems } from '../../../api';

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading
  };
}

export function successLoadDef(defs) {
  return {
    type: SUCCESS_LOAD_DATA,
    payload: defs
  };
}

export function failLoadDef(error) {
  return {
    type: FAIL_LOAD_DATA,
    payload: error
  };
}

export function fetchDefs() {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await fetchDefItems();
      dispatch(successLoadDef(data));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(failLoadDef(e));
      dispatch(setLoading(false));
    }
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  };
}

export function setPerPage(perPage) {
  return {
    type: SET_PER_PAGE,
    payload: perPage
  };
}
