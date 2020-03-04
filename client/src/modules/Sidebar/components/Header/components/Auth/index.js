import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import permissionService from '../../../../../Auth/permissionService';
import SignIn from '../../../../../Auth/submodules/SignIn';
import SignUpSendmail from '../../../../../Auth/submodules/SignUp/submodules/SignUpSendmail';
import {
  SIGNUP
} from '../../../../../Auth/const';

const Auth = ({ user }) => {
  const [permissionForSignUp, changePermissionForSignUp] = useState(false);

  useEffect(() => {
    const permissionSignUp = permissionService(SIGNUP, user);
    changePermissionForSignUp(permissionSignUp);
  }, [user]);

  return (
    <div>
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
