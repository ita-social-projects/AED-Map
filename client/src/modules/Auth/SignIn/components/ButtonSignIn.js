import React from 'react';
import { Button } from '@material-ui/core';

const ButtonAuth = ({ handleOpen }) => (
  <Button color="inherit" onClick={handleOpen}>Вхід</Button>
);

export default ButtonAuth;
