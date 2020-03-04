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
import ItemList from './components/ItemList';
import AddForm from './components/AddForm';
import { sidebarWidth } from './styleConstants';
import Alert from '../../shared/Alert';
import useAlert from '../../shared/Alert/useAlert';
import { 
  CREATE_DEF_POINT
} from './components/ItemList/consts';

const useStyles = makeStyles({
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: sidebarWidth,
    padding: 20,
    maxHeight: '100vh',
    flexShrink: 0
  },
  addButtonStyle: {
    marginTop: 10,
    width: '100%'
  },
  LinkStyle: {
    textDecoration: 'none'
  }
});

const Sidebar = ({ user }) => {
  const classes = useStyles();
  const [alert, ShowAlert] = useAlert();
  const [permissionForAdd, changePermissionForAdd] = useState(false);

  useEffect(() => {
    const permissionAdd = permissionService(CREATE_DEF_POINT, user);
    changePermissionForAdd(permissionAdd);
  },[user]);

  return (
    <Router>
      <div className={classes.sidebarStyle}>
        <Header />
        <Route path="/" exact>
          <ItemList />
          <Link
            to="/add-form"
            className={classes.LinkStyle}
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
        <PrivateRoute path="/add-form" component={AddForm} permission={permissionForAdd} />
        <Alert
          open={alert.open}
          massage={alert.massage}
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
  })
};

export default connect(
  state => ({
    user: state.user.user
  })
)(Sidebar);
