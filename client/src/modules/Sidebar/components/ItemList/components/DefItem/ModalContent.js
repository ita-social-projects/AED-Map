import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deleteDefItem } from '../../actions/list';

const useStyles = makeStyles({
  container: {
    width: '300px',
    height: '100px',
    textAlign: 'center',
    marginTop: '10px'
  }
});

const ModalContent = ({ handleClose, id, deleteDefibrPoint }) => {
  const classes = useStyles();

  const handleButtonDelete = () => {
    deleteDefibrPoint(id);
    handleClose();
  };

  return (
    <div className={classes.container}>
      <p>Видалити мітку?</p>
      <Button onClick={handleButtonDelete}>Так</Button>
    </div>
  );
};
ModalContent.defaultProps = {
  id: '',
  handleClose: () => null,
  deleteDefibrPoint: () => null
};
ModalContent.propTypes = {
  handleClose: PropTypes.func,
  deleteDefibrPoint: PropTypes.func,
  id: PropTypes.string
};

export default connect(
  null,
  dispatch => ({
    deleteDefibrPoint: id => dispatch(deleteDefItem(id)),
  })
)(ModalContent);
