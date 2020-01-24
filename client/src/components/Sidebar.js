import React from 'react';
import { connect } from 'react-redux';
import myClasses from '../styles';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';

import { defsFilterSelector } from '../reducers/defReducer';

const Sidebar = () => {
  
  const [visible, setVisible] = React.useState(true);
  const changeVisibilityClass = visible ? myClasses.sidebarStyle : myClasses.sidebarSetVisible;

  return (
    <div className={changeVisibilityClass}>
      <Header setVisible={setVisible}/>
      <ItemList />
      <AddForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFilterGetResult: defsFilterSelector(state).length
});

export default connect(mapStateToProps)(Sidebar);
