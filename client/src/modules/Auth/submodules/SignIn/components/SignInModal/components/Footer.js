import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line'
  }
});

const Footer = ({ error }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.message} variant="body2" color="error" align="center">
      { error }
    </Typography>
  );
};

Footer.defaultProps = {
  error: ''
};

Footer.propTypes = {
  error: PropTypes.string
};

export default Footer;
