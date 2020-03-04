import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
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

const App = ({ success, fail }) => {
  const classes = useStyles();

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

  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Switch>
          <Route path="/signup/:email/:token" component={SignUpPassword} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  success: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  success: (user, authorization) =>
    dispatch(successSignIn(user, authorization)),
  fail: () => dispatch(failSignIn())
}))(App);
