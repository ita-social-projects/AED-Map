import {
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT
} from '../consts';

const initialState = [];

export default function(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    // CRUD
    case CREATE_DEF_POINT:
      return [payload, ...state];
    case DELETE_DEF_POINT:
      return state.filter(def => def.id !== payload);
    case EDIT_DEF_POINT: {
      const { id, newDefInfo } = payload;
      const newData = state.map(def => {
        if (def.id === id) {
          return { ...def, ...newDefInfo };
        }
        return def;
      });
      return newData;
    }
    default:
      return state;
  }
}
