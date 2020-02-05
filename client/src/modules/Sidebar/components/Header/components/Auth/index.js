import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from '../../../../../Auth/submodules/SignIn';
import SignUp from '../../../../../Auth/submodules/SignUp';

const useStyle = makeStyles({
  auth: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});

const Auth = () => {
  const classes = useStyle();

  return (
    <div className={classes.auth}>
      <SignUp />
      <SignIn />
    </div>
  );

};

export default Auth;
