import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import SearchMobile from './components/Search/SearchMobile';
import ItemListMobile from './components/ItemList/ItemListMobile';
import Alert from '../../shared/Alert';
import useAlert from '../../shared/Alert/useAlert';
import { LOGO_IMG } from '../../consts/header';

const useStyles = makeStyles({
  sidebarStyle: {
    position: 'fixed',
    left: '0',
    width: '100%',
    padding: 20,
    height: '70px',
    backgroundColor: '#282c34',
    zIndex: '10'
  },
  sidebarHeader: {
    height: '30px',
    width: '30px',
    position: 'absolute',
    left: '10px'
  }
});

const SidebarMobile = () => {
  const classes = useStyles();
  const [alert, ShowAlert] = useAlert();

  return (
    <Router>
      <>
        <div className={classes.sidebarStyle}>
          <img
            src={LOGO_IMG}
            className={classes.sidebarHeader}
            alt="logo"
          />
          <Route path="/" exact>
            <SearchMobile />
            <ItemListMobile />
          </Route>
          <Alert
            open={alert.open}
            message={alert.message}
            severity={alert.severity}
            handleClose={() => ShowAlert({ open: false })}
          />
        </div>
      </>
    </Router>
  );
};

export default SidebarMobile;
