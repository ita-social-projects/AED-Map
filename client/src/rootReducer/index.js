import { combineReducers } from 'redux';

import userReducer from '../modules/Auth/reducers/user';
import listReducer from '../modules/Sidebar/components/ItemList/reducers/listReducer';
import filterReducer from '../modules/Sidebar/components/Header/components/Filter/reducers/filterReducer';
import mapStateReducer from '../modules/MapHolder/reducers/mapStateReducer';

export default combineReducers({
  user: userReducer,
  filter: filterReducer,
  mapState: mapStateReducer,
  defs: listReducer
});
