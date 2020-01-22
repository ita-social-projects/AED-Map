import React from 'react';
import { createUseStyles } from 'react-jss';
import myClasses from '../styles';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';
import Search from './Search';
import Filter from './Filter/Filter';
import { defsFilterSelector } from '../reducers/defReducer';
import { connect } from 'react-redux';

const useStyle = createUseStyles({
  searchFilterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

const Sidebar = ({ isFilterGetResult }) => {
  const classes = useStyle();

  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      {/* temporary */}
      <div className={classes.searchFilterContainer}>
        {/* Search is a plug */}
        <Search />
        <Filter />
      </div>
      {isFilterGetResult ? (
        <ItemList />
      ) : (
        <div>
          {
            'Вибачте, ми не знайшли даних по заданому фільру'
          }
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
