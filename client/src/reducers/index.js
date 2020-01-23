import { combineReducers } from 'redux';

import defReducer from './defReducer';
import filterReducer from './filterReducer';
import mapReducer from './mapReducer';

export default combineReducers({
  defs: defReducer,
  filter: filterReducer,
  map: mapReducer
});
