import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Button } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles(() => ({
  modal: {
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    height: 200,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1500,
    animation: '$modal 1.5s'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    minWidth: '70vw',
    padding: '25px 40px',
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
    marginRight: 20
  },
  '@keyframes modal': {
    from: {
      bottom: -250
    },
    to: {
      bottom: 0
    }
  }
}));

const StartModal = ({ open, setStartModal }) => {
  const classes = useStyles();
  const handleClose = () => {
    setStartModal(false);
  };

  return (
    <div className={classes.modal}>
      <Fade in={open} timeout={2000}>
        <div className={classes.container}>
          <p>
            <WarningRoundedIcon
              className={classes.warningIcon}
              fontSize="large"
            />
            Не несемо відповідальності за роботу
            дефібриляторів.
          </p>
          <Button variant="contained" onClick={handleClose}>
            Зрозуміло!
          </Button>
        </div>
      </Fade>
    </div>
  );
};

StartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setStartModal: PropTypes.func.isRequired
};

export default StartModal;
