import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import ResetSendmail from '../../../../Reset/submodules/ResetSendmail';

const useStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line',
    marginTop: 20
  },
  containerResetPassword: {
    textAlign: 'center',

    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const Footer = ({ error }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs className={classes.containerResetPassword}>
          <ResetSendmail />
        </Grid>
      </Grid>
      <Typography className={classes.message} variant="body2" color="error" align="center">
        { error }
      </Typography>
    </>
  );
};

Footer.defaultProps = {
  error: ''
};

Footer.propTypes = {
  error: PropTypes.string
};

export default Footer;
