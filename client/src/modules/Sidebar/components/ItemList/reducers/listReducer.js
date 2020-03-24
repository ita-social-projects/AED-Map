import {
  START_LOAD_DATA,
  SUCCESS_LOAD_DATA,
  SET_DATA,
  CLEAR_DATA,
  FAIL_LOAD_DATA,
  SET_ACTIVE,
  CREATE_DEF_POINT,
  DELETE_DEF_POINT,
  EDIT_DEF_POINT,
  BLOCK_DEF_POINT,
  SET_PAGE,
  SET_PER_PAGE
} from '../consts';

const initialState = {
  loading: false,
  error: null,
  listData: [],
  mapData: [],
  totalCount: 0,
  active: null,
  page: 1,
  perPage: 10,
  coordinates: null
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
        listData: payload
      };
    case CLEAR_DATA:
      return {
        ...initialState
      };
    case SUCCESS_LOAD_DATA:
      return {
        ...state,
        listData: [...state.listData, ...payload.listDefs],
        mapData: payload.mapDefs,
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
        listData: [payload, ...state.listData],
        mapData: [payload, ...state.mapData]
      };
    case DELETE_DEF_POINT:
      return {
        ...state,
        /* eslint-disable-next-line */
        listData: state.listData.filter(
          def => def._id !== payload
        ),
        mapData: state.mapData.filter(
          def => def._id !== payload
        )
      };
    case EDIT_DEF_POINT: {
      const { id, newDefInfo } = payload;
      const updateItem = def => {
        /* eslint-disable-next-line */
        if (def._id === id) {
          return { ...def, ...newDefInfo };
        }
        return def;
      };
      const newListData = state.listData.map(updateItem);
      const newMapData = state.mapData.map(updateItem);

      return {
        ...state,
        listData: newListData,
        mapData: newMapData
      };
    }
    case BLOCK_DEF_POINT: {
      const { id, blocked } = payload;
      const updateItem = def => {
        /* eslint-disable-next-line */
        if (def._id === id) {
          return { ...def, blocked };
        }
        return def;
      };
      const newListData = state.listData.map(updateItem);
      const newMapData = state.mapData.map(updateItem);

      return {
        ...state,
        listData: newListData,
        mapData: newMapData
      };
    }
    case SET_ACTIVE:
      return {
        ...state,
        active: payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload || state.page + 1,
        totalCount: payload === 1 ? 0 : state.totalCount
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: payload
      };
    default:
      return state;
  }
};
export default listReducer;
