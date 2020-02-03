import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from '../../../Auth/SignIn';
import Search from './components/Search';
import Filter from './components/Filter';

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
      <SignIn />
      {/* Search is a plug */}
      <Search />
      <Filter />
    </div>
  );
};

export default Header;
