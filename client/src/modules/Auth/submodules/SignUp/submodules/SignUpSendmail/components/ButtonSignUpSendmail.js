import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonSignUpSendmail = ({ handleOpen }) => (
  <Button variant="contained" color="primary" onClick={handleOpen}>
    Реєстрація
  </Button>
);

ButtonSignUpSendmail.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonSignUpSendmail;
