import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const InputAdornmentPassword = ({ showPassword, handleClickShowPassword, handleMouseDownPassword }) => (
  <InputAdornment position="end">
    <IconButton
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
);

InputAdornmentPassword.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired
};

export default InputAdornmentPassword;
