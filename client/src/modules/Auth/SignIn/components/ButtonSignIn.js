import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

const ButtonAuth = ({ handleOpen }) => (
  <IconButton color="inherit" onClick={handleOpen}>
    <ExitToApp />
  </IconButton>
);

ButtonAuth.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonAuth;
