import {
  START_LOAD_DATA,
  SET_DATA,
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
export const startLoadDef = () => {
  return {
    type: START_LOAD_DATA
  };
};

export const successLoadDef = defs => {
  return {
    type: SUCCESS_LOAD_DATA,
    payload: defs
  };
};

export const setData = data => {
  return {
    type: SET_DATA,
    payload: data
  };
};

export const setPage = page => {
  return {
    type: SET_PAGE,
    payload: page
  };
};

export const failLoadDef = error => {
  return {
    type: FAIL_LOAD_DATA,
    payload: error
  };
};

export const fetchDefs = params => {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await fetchDefItems(
        params,
        defsCancelToken.instance
      );
      dispatch(setPage());
      dispatch(successLoadDef(data));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
};

export const createDefPoint = newDef => {
  return {
    type: CREATE_DEF_POINT,
    payload: newDef
  };
};

export const deleteDefPoint = id => {
  return {
    type: DELETE_DEF_POINT,
    payload: id
  };
};
export const editDefPoint = (id, newDefInfo) => {
  return {
    type: EDIT_DEF_POINT,
    payload: {
      id,
      newDefInfo
    }
  };
};

export const createDefItem = newItem => {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await createItem(newItem);
      dispatch(createDefPoint(data.defibrillator));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
};

export const deleteDefItem = id => {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await deleteItem(id);
      dispatch(deleteDefPoint(data.defibrillator._id));
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
};

export const editDefItem = (id, newDefInfo) => {
  return async dispatch => {
    dispatch(startLoadDef());
    try {
      const { data } = await editItem(id, newDefInfo);
      const { defibrillator } = data;
      dispatch(
        editDefPoint(defibrillator._id, defibrillator)
      );
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
};

export const setPerPage = perPage => {
  return {
    type: SET_PER_PAGE,
    payload: perPage
  };
};
