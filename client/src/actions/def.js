import {
  START_LOAD_DEF,
  SUCCESS_LOAD_DEF,
  FAIL_LOAD_DEF,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
} from '../consts/def';

export function startLoadDef() {
  return {
    type: START_LOAD_DEF,
  };
}

export function successLoadDef(defs) {
  return {
    type: SUCCESS_LOAD_DEF,
    defs,
  };
}

export function failLoadDef(error) {
  return {
    type: FAIL_LOAD_DEF,
    error,
  };
}

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function fetchDefs(url) {
  return (dispatch) => {
    dispatch(startLoadDef());
    //SYNTHETIC DELAY
    return delay(1000).then(() =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => dispatch(successLoadDef(data)))
        .catch((error) => dispatch(failLoadDef(error))),
    );
  };
}

// CRUD
export function createDefPoint(newDef) {
  return {
    type: CREATE_DEF_POINT,
    newDef,
  };
}

export function deleteDefPoint(id) {
  return {
    type: DELETE_DEF_POINT,
    id,
  };
}

export function editDefPoint(id, newDefInfo) {
  return {
    type: EDIT_DEF_POINT,
    id,
    newDefInfo,
  };
}
