import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line'
  }
});

const Footer = ({ success }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.message} variant="body2" color="primary" align="center">
      {success}
    </Typography>
  );
};

Footer.defaultProps = {
  success: ''
};

Footer.propTypes = {
  success: PropTypes.string
};

export default Footer;
