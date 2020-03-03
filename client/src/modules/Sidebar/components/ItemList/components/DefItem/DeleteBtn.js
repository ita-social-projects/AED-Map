import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteBtn = ({ handleOpen }) => {
  return (
    <button type="button" onClick={handleOpen}>
      <span>
        <DeleteIcon />
      </span>
    </button>
  );
};

DeleteBtn.defaultProps = {
  handleOpen: () => null
};
DeleteBtn.propTypes = {
  handleOpen: PropTypes.func
};

export default DeleteBtn;
