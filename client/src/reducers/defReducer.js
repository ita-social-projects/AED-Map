import {
  START_LOAD_DEF,
  SUCCESS_LOAD_DEF,
  FAIL_LOAD_DEF,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
} from '../consts/def';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default function(defs = initialState, action) {
  switch (action.type) {
    // LOAD
    case START_LOAD_DEF:
      return {
        ...defs,
        loading: true,
        error: null,
      };
    case SUCCESS_LOAD_DEF:
      return {
        ...defs,
        loading: false,
        data: action.defs,
      };
    case FAIL_LOAD_DEF:
      return {
        ...defs,
        loading: false,
        error: action.error,
      };
    // CRUD
    case CREATE_DEF_POINT:
      const newDef = action.newDef;
      return {
        ...defs,
        data: [newDef, ...defs.data],
      };
    case DELETE_DEF_POINT:
      return {
        ...defs,
        data: defs.data.filter(
          (def) => def.id !== action.id,
        ),
      };
    case EDIT_DEF_POINT:
      const newDefInfo = action.newDefInfo;
      const newData = defs.data.map((def) => {
        if (def.id === action.id) {
          return { ...def, ...newDefInfo };
        }
        return def;
      });
      return {
        ...defs,
        data: newData,
      };
    default:
      return defs;
  }
}

export function defsFilterSelector(state) {
  return state.defs.data.filter((def) =>
    def.address
      .toLowerCase()
      .includes(state.filter.toLowerCase()),
  );
}
