import React from 'react';
import { connect } from 'react-redux';
import myClasses from '../styles';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';
import { defsFilterSelector } from '../reducers/defReducer';

const Sidebar = () => {
  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      <ItemList />
      <AddForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFilterGetResult: defsFilterSelector(state).length
});

export default connect(mapStateToProps)(Sidebar);
