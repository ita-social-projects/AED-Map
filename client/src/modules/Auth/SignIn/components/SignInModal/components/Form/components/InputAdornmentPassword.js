import React from 'react';
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

export default InputAdornmentPassword;
