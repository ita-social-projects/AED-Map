import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../../../../../shared/Loader';

const useStyles = makeStyles({
  infoMessage: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    zIndex: 10
  }
});

const InfoMessage = ({ children }) => {
  const classes = useStyles();
  const isLoading = children === 'Завантаження...';

  return (
    <div className={classes.infoMessage}>
      {isLoading && <Loader />}
      <p>{children}</p>
    </div>
  );
};

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoMessage;
