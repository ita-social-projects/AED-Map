import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 1.5),
    '&:focus': {
      outline: 0
    }
  }
}));

const ModalWrapper = ({ ButtonOpen, ModalContent }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonOpen handleOpen={handleOpen} />

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalContent handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

ModalWrapper.propTypes = {
  ButtonOpen: PropTypes.elementType.isRequired,
  ModalContent: PropTypes.elementType.isRequired
};

export default ModalWrapper;
