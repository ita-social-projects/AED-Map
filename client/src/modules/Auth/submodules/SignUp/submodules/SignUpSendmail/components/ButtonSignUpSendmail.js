import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    height: 50,
    marginTop: 25
  }
});

const ButtonSignUpSendmail = ({ handleOpen }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="primary" onClick={handleOpen}>
      Зареєструвати користувача
    </Button>
  );
};
ButtonSignUpSendmail.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonSignUpSendmail;
