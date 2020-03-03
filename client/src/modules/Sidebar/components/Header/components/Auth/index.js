import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import permissionService from '../../../../../Auth/permissionService';
import SignIn from '../../../../../Auth/submodules/SignIn';
import SignUpSendmail from '../../../../../Auth/submodules/SignUp/submodules/SignUpSendmail';
import {
  SIGNUP
} from '../../../../../Auth/const';

const useStyle = makeStyles({
  auth: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,

    '& button:only-child': {
      marginLeft: 'auto'
    }
  }
});

const Auth = ({ user }) => {
  const classes = useStyle();
  const [permissionForSignUp, changePermissionForSignUp] = useState(false);

  useEffect(() => {
    const permissionSignUp = permissionService(SIGNUP, user);
    changePermissionForSignUp(permissionSignUp);
  }, [user]);

  return (
    <div className={classes.auth}>
      {permissionForSignUp && <SignUpSendmail />}
      <SignIn />
    </div>
  );
};

Auth.defaultProps = {
  user: null
};

Auth.propTypes = {
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
)(Auth);
