import React from 'react';
import { useField } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

export const MyTextField = (props) => {
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

export const MyCheckbox = ({ label, ...props }) => {
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
