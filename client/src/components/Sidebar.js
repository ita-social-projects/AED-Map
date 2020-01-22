import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myClasses from '../styles';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';
import Filter from './Filter';

import { defsFilterSelector } from '../reducers/defReducer';

const Sidebar = ({ isFilterGetResult }) => {
  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      <Filter />
      {isFilterGetResult ? (
        <ItemList />
      ) : (
        <div>
          Вибачте, ми не знайшли даних по заданій адресі
        </div>
      )}
      <AddForm />
    </div>
  );
};
Sidebar.defaultProps = {
  isFilterGetResult: 0,
};
Sidebar.propTypes = {
  isFilterGetResult: PropTypes.number,
};
const mapStateToProps = (state) => ({
  isFilterGetResult: defsFilterSelector(state).length,
});
export default connect(mapStateToProps)(Sidebar);
