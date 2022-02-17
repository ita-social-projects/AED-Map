import { combineReducers } from 'redux';

import userReducer from '../modules/Auth/reducers/user';
import listReducer from '../modules/Sidebar/components/ItemList/reducers/listReducer';
import filterReducer from '../modules/Sidebar/components/Search/components/Filter/reducers/filterReducer';
import mapStateReducer from '../modules/MapHolder/reducers/mapStateReducer';
import addNewPointReducer from '../modules/MapHolder/reducers/addNewPointReducer';
import popupDisplayReducer from '../modules/MapHolder/reducers/popupDisplayReducer';
import searchReducer from '../modules/Sidebar/components/Search/reducers';
import setFullTimeReducer from '../modules/Sidebar/components/EditForm/reducers/index';
import setFromTimeReducer from '../modules/Sidebar/components/EditForm/reducers/timeFrom';
import setUntilTimeReducer from '../modules/Sidebar/components/EditForm/reducers/timeUntil';

export default combineReducers({
  user: userReducer,
  filter: filterReducer,
  mapState: mapStateReducer,
  newPoint: addNewPointReducer,
  defs: listReducer,
  popupData: popupDisplayReducer,
  search: searchReducer,
  setFullTime: setFullTimeReducer,
  setFromTime: setFromTimeReducer,
  setUntilTime: setUntilTimeReducer
});
