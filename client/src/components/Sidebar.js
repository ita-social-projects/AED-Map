import React from 'react';
import Header from './Header';
import ItemList from './ItemList';
import AddForm from './AddForm';
import Filter from './Filter';
import { defsFilterSelector } from '../reducers/defReducer';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '360px',
    padding: '20px',
    maxHeight: '100vh',
    flexShrink: '0',
  },
  noResult: {
    color: '#ccc',
  },
});

const Sidebar = ({ isFilterGetResult }) => {
  const classes = useStyle();

  return (
    <div className={classes.sidebarStyle}>
      <Header />
      <Filter />
      {isFilterGetResult ? (
        <ItemList />
      ) : (
        <div className={classes.noResult}>
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
