import React from 'react';
import { connect } from 'react-redux';
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
// import { setSearch } from './components/Search/actions';

const useStyles = makeStyles({
  sidebarStyle: {
    position: 'fixed',
    left: '0',
    width: '100%',
    padding: 24,
    height: '100px',
    backgroundColor: 'rgba(36, 36, 36, 1)',
    zIndex: '10'
  },
  sidebarHeader: {
    height: '24px',
    width: '24px',
    position: 'absolute',
    left: '16px',
    top: '36px'
  }
});

const SidebarMobile = search => {
  const isSearchNotEmpty = search.search.address;
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
            {isSearchNotEmpty && <ItemListMobile />}
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

export default connect(state => ({ search: state.search }))(
  SidebarMobile
);
