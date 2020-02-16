import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  infoMessage: {
    position: 'absolute',
    zIndex: '10',
    width: '98%',
    height: '98%',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#282c34',
    display: show => (show ? 'flex' : 'none'),
    transform: 'translateY(-50%)',
    color: 'white',
    textAlign: 'center'
  }
});

const InfoMessage = ({ children, show }) => {
  const classes = useStyles(show);
  return (
    <div className={classes.infoMessage}>{children}</div>
  );
};

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired
};

export default InfoMessage;
