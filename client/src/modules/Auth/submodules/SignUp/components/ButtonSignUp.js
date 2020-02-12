import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonSignUp = ({ handleOpen }) => (
  <Button variant="contained" color="primary" onClick={handleOpen}>
    Реєстрація
  </Button>
);

ButtonSignUp.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonSignUp;
