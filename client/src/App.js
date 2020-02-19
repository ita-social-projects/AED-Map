import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { watcherStart } from './shared/websocket';
import cancelToken from './shared/cancel-token';
import { validateUser } from './modules/Auth/api';
import {
  successSignIn,
  failSignIn
} from './modules/Auth/actions/user';
import Sidebar from './modules/Sidebar';
import MapHolder from './modules/MapHolder';

const ValidateCancelToken = cancelToken();

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  }
});

const App = ({ success, fail }) => {
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const { data, headers } = await validateUser();
        const { authorization } = headers;
        success(data, authorization);
        watcherStart();
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
        <Sidebar />
        <MapHolder />
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
