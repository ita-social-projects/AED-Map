import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  pointCardDeleteButton: {
    marginLeft: 10
  }
});

const DeleteBtn = ({ handleOpen }) => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.pointCardDeleteButton} size="small" onClick={handleOpen}>
      Видалити
    </Button>
  );
};

DeleteBtn.defaultProps = {
  handleOpen: () => null
};
DeleteBtn.propTypes = {
  handleOpen: PropTypes.func
};

export default DeleteBtn;
