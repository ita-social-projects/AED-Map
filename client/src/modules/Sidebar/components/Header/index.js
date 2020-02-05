import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from './components/Auth';
import Search from './components/Search';
import Filter from './components/Filter';

const useStyle = makeStyles({
  searchFilterContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10
  }
});

const Header = () => {
  const classes = useStyle();

  return (
    <div className={classes.searchFilterContainer}>
      <Auth />
      {/* Search is a placeholder */}
      <Search />
      <Filter />
    </div>
  );
};

export default Header;
