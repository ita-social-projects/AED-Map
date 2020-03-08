import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonModalPhoto = ({ handleOpen }) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleOpen}
    >
      Фотографії
    </Button>
  );
};

ButtonModalPhoto.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonModalPhoto;
