import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LOGO_IMG } from '../../../../consts/header';
import SignIn from '../../../Auth/submodules/SignIn';
import { setActive } from '../ItemList/actions/list';

const useStyles = makeStyles({
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

const Header = ({ resetItemActive }) => {
  const classes = useStyles();
  const handleClick = () => {
    resetItemActive();
  };
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerContainer}>
        <Link to="/">
          <Tooltip
            title="Головна сторінка"
            onClick={handleClick}
          >
            <img
              src={LOGO_IMG}
              className={classes.headerLogo}
              alt="logo"
            />
          </Tooltip>
        </Link>
        <div className={classes.headerRight}>
          <SignIn />
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  resetItemActive: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  resetItemActive: () => dispatch(setActive(null))
}))(Header);
