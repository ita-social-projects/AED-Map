import {
  START_LOAD_DATA,
  SUCCESS_LOAD_DATA,
  FAIL_LOAD_DATA,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
  SET_PAGE,
  SET_PER_PAGE
} from '../consts';
import {
  fetchDefItems,
  createItem,
  deleteItem,
  editItem
} from '../../../api';
import cancelToken from '../../../../../shared/cancel-token';

const defsCancelToken = cancelToken();
export function startLoadDef() {
  return {
    type: START_LOAD_DATA
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

export function fetchDefs(params) {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await fetchDefItems(
        params,
        defsCancelToken.instance
      );
      dispatch(successLoadDef(data));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
}

export function createDefPoint(newDef) {
  return {
    type: CREATE_DEF_POINT,
    payload: newDef
  };
}

export function deleteDefPoint(id) {
  return {
    type: DELETE_DEF_POINT,
    payload: id
  };
}
export function editDefPoint(id, newDefInfo) {
  return {
    type: EDIT_DEF_POINT,
    payload: {
      id,
      newDefInfo
    }
  };
}

export function createDefItem(newItem) {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await createItem(newItem);
      dispatch(createDefPoint(data.defibrillator));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
}

export function deleteDefItem(id) {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await deleteItem(id);
      /* eslint-disable-next-line */
      dispatch(deleteDefPoint(data.defibrillator._id));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
}

export function editDefItem(id, newDefInfo) {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await editItem(id, newDefInfo);
      const { defibrillator } = data;
      dispatch(
        /* eslint-disable-next-line */
        editDefPoint(defibrillator._id, defibrillator)
      );
    } catch (e) {
      dispatch(failLoadDef(e));
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
