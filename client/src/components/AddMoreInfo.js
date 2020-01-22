import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function MaxHeightTextarea({additional_information,addMore}) {
  const handleChange = (event) => {
    addMore(event.target.value);
  };

  return (
    <div style={{ marginLeft: '24px' }}>
      <TextField
        id="standard-multiline-flexible"
        label="Додаткова інформація..."
        style={{ width: '274px' }}
        multiline
        value={additional_information}
        rows="4"
        variant="filled"
        onChange={handleChange}
      />
    </div>
  );
}

MaxHeightTextarea.propTypes = {
  additional_information: PropTypes.string.isRequired,
  addMore: PropTypes.func.isRequired
}; 
