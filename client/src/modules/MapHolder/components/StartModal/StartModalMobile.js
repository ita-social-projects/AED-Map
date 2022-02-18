import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles(() => ({
  modal: {
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    height: 100,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 36, 36, 1)',
    backdropFilter: 'blur(3px)',
    zIndex: 1500
  },
  container: {
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '70vw',
    minHeight: '100px',
    padding: '24px 6px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    boxShadow: '5px 5px 5px black',
    '& p': {
      display: 'flex',
      alignItems: 'center',
      color: 'white'
    }
  },
  warningIcon: {
    marginRight: 16,
    marginLeft: 8,
    color: 'rgba(240, 255, 0, 1)',
    height: 24,
    width: 24
  },
  acceptButton: {
    marginRight: 24,
    marginLeft: 24,
    fontSize: 12,
    fontWeight: 600,
    minHeight: 40,
    minWidth: 128,
    padding: '6px 24px',
    borderRadius: 4,
    background: 'rgba(254, 254, 254, 1)'
  }
}));

const StartModalMobile = ({ setStartModal }) => {
  const classes = useStyles();

  const handleClose = () => {
    sessionStorage.setItem('startModal', 'close');
    setStartModal(false);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.container}>
        <WarningRoundedIcon
          className={classes.warningIcon}
          fontSize="large"
        />
        <p className={classes.acceptButtonText}>
          Ми не несемо відповідальності за роботу
          дефібриляторів.
        </p>
        <Button
          className={classes.acceptButton}
          variant="contained"
          onClick={handleClose}
        >
          ЗРОЗУМІЛО
        </Button>
      </div>
    </div>
  );
};

StartModalMobile.propTypes = {
  setStartModal: PropTypes.func.isRequired
};

export default StartModalMobile;
