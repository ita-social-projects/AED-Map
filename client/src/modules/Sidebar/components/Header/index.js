import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Search from '../Search';
import Filter from '../Filter';

const useStyle = makeStyles({
  searchFilterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10
  }
});

const Header = () => {
  const classes = useStyle();

  return (
    <div className={classes.searchFilterContainer}>
      {/* Search is a plug */}
      <Search />
      <Filter />
    </div>
  );
};

export default Header;
