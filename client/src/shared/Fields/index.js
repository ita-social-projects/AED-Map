import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

const MyTextField = (props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      className="text-input"
      helperText={meta.touched ? meta.error : ''}
      error={meta.touched && Boolean(meta.error)}
      {...field}
      {...props}
    />
  );
};

const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <FormControlLabel
      control={(
        <Checkbox
          {...field}
          {...props}
        />
      )}
      label={label}
    />
  );
};

MyCheckbox.propTypes = {
  label: PropTypes.string.isRequired
};

export { MyTextField, MyCheckbox };
