import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LoaderMobile from '../../../../../../shared/Loader/LoaderMobile';

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
    color: 'black',
    textAlign: 'center',
    zIndex: 10
  }
});

const InfoMessageMobile = ({ children }) => {
  const classes = useStyles();
  const isLoading = children === 'Завантаження...';

  return (
    <div className={classes.infoMessage}>
      {isLoading && <LoaderMobile />}
      <p>{children}</p>
    </div>
  );
};

InfoMessageMobile.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoMessageMobile;
