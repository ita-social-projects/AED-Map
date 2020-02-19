import {
  START_LOAD_DATA,
  SUCCESS_LOAD_DATA,
  SET_DATA,
  FAIL_LOAD_DATA,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
  SET_PAGE,
  SET_PER_PAGE
} from '../consts';

const initialState = {
  loading: false,
  error: null,
  data: [],
  totalCount: 0,
  page: 1,
  perPage: 10
};

const listReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    // LOAD
    case START_LOAD_DATA:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_DATA:
      return {
        ...state,
        loading: false,
        data: payload
      };
    case SUCCESS_LOAD_DATA:
      return {
        ...state,
        data: [...state.data, ...payload.defibrillators],
        totalCount: payload.totalCount,
        loading: false
      };
    case FAIL_LOAD_DATA:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CREATE_DEF_POINT:
      return {
        ...state,
        loading: false,
        data: [payload, ...state.data]
      };
    case DELETE_DEF_POINT:
      return {
        ...state,
        loading: false,
        /* eslint-disable-next-line */
        data: state.data.filter(def => def._id !== payload)
      };
    case EDIT_DEF_POINT: {
      const { id, newDefInfo } = payload;
      const newData = state.data.map(def => {
        /* eslint-disable-next-line */
        if (def._id === id) {
          return { ...def, ...newDefInfo };
        }
        return def;
      });
      return { ...state, loading: false, data: newData };
    }
    case SET_PAGE:
      return {
        ...state,
        loading: false,
        page: payload || state.page + 1,
        totalCount: payload === 1 ? 0 : state.totalCount
      };
    case SET_PER_PAGE:
      return {
        ...state,
        loading: false,
        perPage: payload
      };
    default:
      return state;
  }
};
export default listReducer;

export const defsSearchSelector = state => {
  const { filter, defs } = state;

  if (filter) {
    return defs.data.filter(def =>
      Object.keys(filter).every(key => {
        return (
          !def[key] ||
          def[key]
            .toLowerCase()
            .includes(filter[key].toLowerCase())
        );
      })
    );
  }
  return defs.data;
};
