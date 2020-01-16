import React from 'react';
import myClasses from '../styles';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';
import Filter from './Filter';

import { defsFilterSelector } from '../reducers/defReducer';
import { connect } from 'react-redux';
const Sidebar = ({ isFilterGetResult }) => {
  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      <Filter />
      {isFilterGetResult ? (
        <ItemList />
      ) : (
        <div>
          {'Вибачте, ми не знайшли даних по заданій адресі'}
        </div>
      )}
      <AddForm />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isFilterGetResult: defsFilterSelector(state).length,
});
export default connect(mapStateToProps)(Sidebar);
