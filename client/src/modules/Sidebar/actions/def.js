import {
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT
} from '../consts';

import { createItem, deleteItem, editItem } from '../api';

import {
  setLoading,
  failLoadDef
} from '../components/ItemList/actions/list';
// CRUD
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
    dispatch(setLoading(true));
    try {
      const { data } = await createItem(newItem);
      dispatch(createDefPoint(data.defibrillator));
    } catch (e) {
      dispatch(failLoadDef(e));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteDefItem(id) {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await deleteItem(id);
      dispatch(deleteDefPoint(data.id));
    } catch (e) {
      dispatch(failLoadDef(e));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function editDefItem(id, newDefInfo) {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await editItem(id, newDefInfo);
      const { defibrillator } = data;
      dispatch(
        /* eslint-disable-next-line */
        editDefPoint(defibrillator._id, defibrillator)
      );
    } catch (e) {
      dispatch(failLoadDef(e));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
