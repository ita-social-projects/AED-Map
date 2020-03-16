import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LOGO_IMG } from '../../../../consts/header';
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
    marginBottom: 10
  },
  headerLogo: {
    width: 35,
    height: 35
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    '& button': {
      position: 'relative',
      height: 35,
      margin: 0,
      background: 'transparent',
      outline: 'none',
      border: 'none',
      '&:last-child': {
        marginLeft: 10
      }
    }
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formControlLabel: {
    display: 'none'
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 35,
    zIndex: 1,
    transform: 'rotate(-90deg)',
    background: 'none',
    border: 'none'
  }
});
const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerContainer}>
        <Link to="/">
          <Tooltip title="Головна сторінка">
            <img
              src={LOGO_IMG}
              className={classes.headerLogo}
              alt="logo"
            />
          </Tooltip>
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
