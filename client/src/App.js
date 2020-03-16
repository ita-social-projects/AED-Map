import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { socketAuthOpen } from './shared/websocket';
import cancelToken from './shared/cancel-token';
import { validateUser } from './modules/Auth/api';
import {
  successSignIn,
  failSignIn
} from './modules/Auth/actions/user';
import Sidebar from './modules/Sidebar';
import MapHolder from './modules/MapHolder';
import SignUpPassword from './modules/Auth/submodules/SignUp/submodules/SignUpPassword';
import { sidebarWidth } from './modules/Sidebar/styleConstants';
import { setActive } from './modules/Sidebar/components/ItemList/actions/list';

const ValidateCancelToken = cancelToken();

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  },
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: sidebarWidth,
    padding: 20,
    maxHeight: '100vh',
    flexShrink: 0
  },
  sidebarSetVisible: {
    display: 'none'
  }
});

const Main = () => {
  const [visible, setVisible] = useState(true);
  const classes = useStyles();
  const changeVisibilityClass = visible
    ? classes.sidebarStyle
    : classes.sidebarSetVisible;

  return (
    <>
      <Sidebar
        setVisible={setVisible}
        changeVisibilityClass={changeVisibilityClass}
      />
      <MapHolder
        setVisible={setVisible}
        visible={visible}
      />
    </>
  );
};

const App = ({
  success,
  fail,
  location,
  mapData,
  makeItemActive
}) => {
  const classes = useStyles();
  const { pathname, search } = location;

  useEffect(() => {
    (async () => {
      try {
        const { data, headers } = await validateUser();
        const { authorization } = headers;
        success(data, authorization);
        socketAuthOpen();
      } catch (e) {
        fail();
      }
    })();

    return () => {
      ValidateCancelToken.cancel();
    };
  });
  if (pathname === '/' && search && mapData.length) {
    makeItemActive(search.split('=')[1]);
  }
  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Switch>
          <Route
            path="/signup/:email/:token"
            component={SignUpPassword}
          />
          <Route path="/" component={Main} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  success: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
  mapData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })
    })
  ).isRequired,
  makeItemActive: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  state => ({
    mapData: state.defs.mapData
  }),
  dispatch => ({
    success: (user, authorization) =>
      dispatch(successSignIn(user, authorization)),
    fail: () => dispatch(failSignIn()),
    makeItemActive: itemId => dispatch(setActive(itemId))
  })
)(withRouter(App));
