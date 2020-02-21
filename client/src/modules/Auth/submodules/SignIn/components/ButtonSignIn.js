import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { socketAuthClose } from '../../../../../shared/websocket';
import { signOut } from '../../../actions/user';

const ButtonSignIn = ({ handleOpen, user, signOutSubmit }) => {
  const handleSignOut = () => {
    signOutSubmit();
    socketAuthClose();
  };

  return (
    <Button variant="contained" color="primary" onClick={user ? handleSignOut : handleOpen}>
      {user ? 'Вихід' : 'Вхід'}
    </Button>
  );
};

ButtonSignIn.defaultProps = {
  user: null
};

ButtonSignIn.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string
  }),
  signOutSubmit: PropTypes.func.isRequired
};

export default connect(
  state => ({
    user: state.user.user
  }),
  dispatch => ({
    signOutSubmit: () => dispatch(signOut())
  })
)(ButtonSignIn);
