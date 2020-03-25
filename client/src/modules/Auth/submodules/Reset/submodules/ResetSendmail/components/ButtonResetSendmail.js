import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonResetSendmail = ({ handleOpen }) => (
  <Button color="primary" onClick={handleOpen}>
    Відновити пароль
  </Button>
);

ButtonResetSendmail.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonResetSendmail;
