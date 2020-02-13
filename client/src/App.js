/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import cancelToken from './shared/cancel-token';
import { validateUser } from './modules/Auth/api';
import { successSignIn, failSignIn } from './modules/Auth/actions/user';
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
    // async function validate() {
    //   try {
    //     const { data, headers } = await validateUser();
    //     const { authorization } = headers;
    //     success(data, authorization);
    //   } catch (e) {
    //     fail();
    //   }
    // }

    // validate();

    // return () => {
    //   ValidateCancelToken.cancel();
    // };

    const token = JSON.parse(localStorage.getItem('authorization'));
    const authorization = token && token.slice(7);
    // const socket = io('ws://localhost:3012', { transports: ["websocket"] });

    // socket.on('connect', function () {
    //   console.log('client connected');

    //   socket.emit('authenticate', { token: authorization });

    //   socket.on('authenticated', () => {
    //     console.log('authenticated')
    //   });

    //   socket.on('unauthorized', () => {
    //     console.log('unauthorized')
    //   });
    // });

    const socket = io('http://localhost:3012', { query: 'auth_token=' + authorization });

    socket.on('error', () => {
      console.log('unauthorized');
    });

    socket.on('success', data => {
      console.dir(data.user);
    });
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

export default connect(
  null,
  dispatch => ({
    success: (user, authorization) => dispatch(successSignIn(user, authorization)),
    fail: () => dispatch(failSignIn())
  })
)(App);
