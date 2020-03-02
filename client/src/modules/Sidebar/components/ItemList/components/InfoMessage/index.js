import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../../../../../shared/Loader';

const useStyles = makeStyles({
  infoMessage: {
    position: 'absolute',
    width: '98%',
    height: '98%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: show => (show ? 'flex' : 'none'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#282c34',
    color: 'white',
    textAlign: 'center',
    zIndex: 10
  }
});

const InfoMessage = ({ children, show }) => {
  const classes = useStyles(show);
  return (
    <div className={classes.infoMessage}>
      {children === 'Завантаження...' && <Loader />}
      <p>{children}</p>
    </div>
  );
};

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired
};

export default InfoMessage;
