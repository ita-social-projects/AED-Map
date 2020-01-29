import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {makeStyles } from '@material-ui/core/styles';
import {LOGO_IMG} from '../../../../consts/header';
import Search from './components/Search';
import Auth from './components/Auth';

const useStyles = makeStyles({
  searchFilterContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  headerWrapper: {
    color: 'white',
    marginBottom: '10px'
  },
  headerLogo: {
    width: '35px',
    height: '35px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    '& button': {
      position: 'relative',
      width: '35px',
      height: '35px',
      background: 'transparent',
      outline: 'none',
      border: '0',
      margin: '0px',
      padding: '0px',
    }
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formControlLabel: {
    display: 'none',
  },
  Filter: {
    margin: '100px',
  },
  bookmarkIcon: {
    position: 'absolute',
    zIndex: '1',
    transform: 'rotate(-90deg)',
    top: '10px',
    left: '10px',
    height: '35px',
    background: 'none',
    border: '0',
  },
});
const Header = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerContainer}>
        <Link to='/'>
          <img src={LOGO_IMG} className={classes.headerLogo} alt='logo' />
        </Link>
        <div className={classes.headerRight}>
          <Auth />
        </div>
      </div>
      <Paper>
        <div>
          <Search /> 
        </div>
      </Paper>
    </div>
  );
};

export default Header;