import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import useAlert from '../Alert/useAlert';

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  },
  msg:{
    fontSize: 20,
    margin: '10px 30px 30px'
  },
  btn:{
    margin: '0 20px'
  }
});

const Content = ({
  handleClose,
  confirmHandle,
  rejectHandle,
  message,
  messageAlert
}) => {
  const classes = useStyles();
  const [, ShowAlert] = useAlert();

  const confirm = () => {
    if (confirmHandle) confirmHandle();
    handleClose();
    ShowAlert({
      open: true,
      severity: 'success',
      message: messageAlert
    });
  };

  const reject = () => {
    if (rejectHandle) rejectHandle();
    handleClose();
  };

  return (
    <div className={classes.container}>
      <p className={classes.msg}>{message}</p>
      <Button className={classes.btn} variant="contained" color="primary" onClick={confirm}>Так</Button>
      <Button className={classes.btn} variant="contained" color="secondary" onClick={reject}>Ні</Button>
    </div>
  );
};

Content.defaultProps ={
  confirmHandle: () => null,
  rejectHandle: () => null
};

Content.propTypes = {
  handleClose: PropTypes.func.isRequired,
  confirmHandle: PropTypes.func,
  rejectHandle: PropTypes.func,
  message: PropTypes.string.isRequired,
  messageAlert: PropTypes.string.isRequired
};

export default Content;
