import React from 'react';
import { createUseStyles } from 'react-jss';
import Search from '../Search';
import Filter from '../Filter';

const useStyle = createUseStyles({
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
