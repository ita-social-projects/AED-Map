import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  infoMessage: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    textAlign: 'center'
  }
});

const InfoMessage = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoMessage}>{children}</div>
  );
};

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoMessage;
