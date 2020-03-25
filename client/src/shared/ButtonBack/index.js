import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    marginTop: 15
  }
});

const ButtonBack = () => {
  const classes = useStyles();
  const history = useHistory();

  const redirectBack = () => {
    history.push('/');
  };

  return(
    <Button
      type="button"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={redirectBack}
    >
      Назад
    </Button>
  );
};

export default ButtonBack;
