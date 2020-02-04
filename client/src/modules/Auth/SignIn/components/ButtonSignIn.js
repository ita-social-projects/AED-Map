import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonAuth = ({ handleOpen }) => (
  <Button color="inherit" onClick={handleOpen}>Вхід</Button>
);

ButtonAuth.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonAuth;
