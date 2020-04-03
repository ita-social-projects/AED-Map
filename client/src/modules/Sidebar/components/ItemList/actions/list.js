import {
  START_LOAD_DATA,
  SET_DATA,
  CLEAR_DATA,
  SUCCESS_LOAD_DATA,
  FAIL_LOAD_DATA,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
  BLOCK_DEF_POINT,
  SET_ACTIVE,
  SET_PAGE,
  SET_PER_PAGE
} from '../consts';
import {
  getDefItems,
  createItem,
  deleteItem,
  editItem,
  blockItem
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

export const clearData = () => {
  return {
    type: CLEAR_DATA
  };
};

export const setActive = id => {
  return {
    type: SET_ACTIVE,
    payload: id
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

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      options
    );
  });
};

export const fetchDefs = params => {
  return async dispatch => {
    dispatch(startLoadDef());
    dispatch(setPage());

    try {
      let userCoordinates;
      try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        userCoordinates = { latitude, longitude };
      } catch (e) {
        userCoordinates = null;
      }

      const { data } = await getDefItems(
        { ...params, ...userCoordinates },
        defsCancelToken.instance
      );
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

export const blockDefPoint = (id, blocked) => {
  return {
    type: BLOCK_DEF_POINT,
    payload: {
      id,
      blocked
    }
  };
};

export const createDefItem = newItem => {
  return async dispatch => {
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
    try {
      const { data } = await deleteItem(id);
      dispatch(deleteDefPoint(data.defibrillator._id));
      dispatch(clearData());
      dispatch(fetchDefs());
    } catch (e) {
      dispatch(failLoadDef(e));
    }
  };
};

export const editDefItem = (id, newDefInfo) => {
  return async dispatch => {
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

export const blockDefItem = (id, blocked) => {
  return async dispatch => {
    try {
      const { data } = await blockItem(id, { blocked });
      const { defibrillator } = data;
      dispatch(
        blockDefPoint(
          defibrillator._id,
          defibrillator.blocked
        )
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
