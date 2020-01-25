import React from 'react';
import { connect } from 'react-redux';
import myClasses from '../../styles';
import Header from './components/Header';
import ItemList from './components/ItemList';
import AddForm from './components/AddForm';

import { defsFilterSelector } from '../../reducers/defReducer';

const Sidebar = () => {
  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      <ItemList />
      <AddForm />
    </div>
  );
};

export default connect(state => ({
  isFilterGetResult: defsFilterSelector(state).length
}))(Sidebar);
