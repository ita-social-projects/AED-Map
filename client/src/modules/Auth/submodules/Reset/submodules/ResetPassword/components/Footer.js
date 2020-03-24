import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line'
  }
});

const Footer = ({ success, error }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.message} variant="body2" color={error ? 'error' : 'primary'} align="center">
      {error || success}
    </Typography>
  );
};

Footer.defaultProps = {
  success: '',
  error: ''
};

Footer.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string
};

export default Footer;
