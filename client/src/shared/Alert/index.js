import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const Alert = ({
  open,
  handleClose,
  severity,
  massage
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={1200}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {massage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  massage: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Alert;
