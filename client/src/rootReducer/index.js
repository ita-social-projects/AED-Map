import { combineReducers } from 'redux';

import defReducer from '../modules/Sidebar/reducers/defReducer';
import listReducer from '../modules/Sidebar/components/ItemList/reducers/listReducer';
import filterReducer from '../modules/Sidebar/components/Header/components/Filter/reducers/filterReducer';
import mapStateReducer from '../modules/MapHolder/reducers/mapStateReducer';

export default combineReducers({
  def: defReducer,
  filter: filterReducer,
  mapState: mapStateReducer,
  defs: listReducer
});
