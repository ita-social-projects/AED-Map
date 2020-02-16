import React, { useEffect } from 'react';
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

const ValidateCancelToken = cancelToken();

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  }
});

const Main = () => (
  <>
    <Sidebar />
    <MapHolder />
  </>
);

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
          <Route path="/" exact component={Main} />
          <Route path="/signup/:email/:token" component={SignUpPassword} />
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
