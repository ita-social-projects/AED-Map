import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import Fade from '@material-ui/core/Fade';
import Filter from './Filter';
import Paper from '@material-ui/core/Paper';
import {makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
})

const Header = ({ setVisible }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const changeSidebarVisibility = () => {
    setVisible(prev => !prev);
  }

  const myClasses = useStyles();

  return <div className={myClasses.headerWrapper}>
    <div className={myClasses.headerContainer}>
      <img src="https://images.vectorhq.com/images/previews/cca/defibrillator-logo-121414.png" className={myClasses.headerLogo}></img>
      <div className={myClasses.headerRight}>
        <button onClick={handleChange}>
          <SearchIcon color='primary' fontSize='large'></SearchIcon>
        </button>
        <button>
          <PersonIcon color='primary' fontSize='large'></PersonIcon>
        </button>
        <button>
          <MenuOpenIcon color='primary' fontSize='large' onClick={changeSidebarVisibility}></MenuOpenIcon>
        </button>
      </div>
    </div>
    <Fade in={checked} unmountOnExit={true} mountOnEnter={true}>
      <Paper>
        <div>
          <Filter></Filter>
        </div>
      </Paper>
    </Fade>
  </div>;
};

export default Header;