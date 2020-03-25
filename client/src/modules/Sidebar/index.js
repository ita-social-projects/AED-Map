import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PrivateRoute from '../../shared/PrivateRoute';
import permissionService from '../Auth/permissionService';
import Header from './components/Header';
import Search from './components/Search';
import ItemList from './components/ItemList';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import Account from './components/Account';
import Alert from '../../shared/Alert';
import useAlert from '../../shared/Alert/useAlert';
import {
  CREATE_DEF_POINT,
  ACCOUNT
} from './components/ItemList/consts';
import { sidebarWidth } from './styleConstants';

const useStyles = makeStyles({
  sidebarStyle: ({ visible }) => ({
    display: visible ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: sidebarWidth,
    padding: 20,
    maxHeight: '100vh',
    flexShrink: 0,
    backgroundColor: '#282c34'
  }),
  addButtonStyle: {
    marginTop: 10,
    width: '100%'
  },
  linkStyle: {
    width: '100%',
    marginTop: 10,
    flexShrink: 0,
    textDecoration: 'none'
  }
});

const Sidebar = ({ user, visible }) => {
  const classes = useStyles({ visible });
  const [alert, ShowAlert] = useAlert();
  const [
    permissionForAdd,
    changePermissionForAdd
  ] = useState(false);
  const [
    permissionForAccount,
    changePermissionForAccount
  ] = useState(false);

  useEffect(() => {
    const permissionAdd = permissionService(
      CREATE_DEF_POINT,
      user
    );
    const permissionAccount = permissionService(
      ACCOUNT,
      user
    );
    changePermissionForAdd(permissionAdd);
    changePermissionForAccount(permissionAccount);
  }, [user]);

  return (
    <Router>
      <div className={classes.sidebarStyle}>
        <Header />
        <Route path="/" exact>
          <Search />
          <ItemList />
          <Link
            to="/add-form"
            className={classes.linkStyle}
          >
            {permissionForAdd && (
              <Button
                className={classes.addButtonStyle}
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
              >
                Додати новий дефібрилятор
              </Button>
            )}
          </Link>
        </Route>
        <PrivateRoute
          path="/add-form"
          component={AddForm}
          permission={permissionForAdd}
        />
        <Route path="/edit-form" component={EditForm} />
        <PrivateRoute
          path="/account"
          component={Account}
          permission={permissionForAccount}
        />
        <Alert
          open={alert.open}
          message={alert.message}
          severity={alert.severity}
          handleClose={() => ShowAlert({ open: false })}
        />
      </div>
    </Router>
  );
};

Sidebar.defaultProps = {
  user: null
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  visible: PropTypes.bool.isRequired
};

export default connect(state => ({
  user: state.user.user
}))(Sidebar);
