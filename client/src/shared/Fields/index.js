import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles({
  textField: {
    whiteSpace: 'pre-line'
  }
});

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
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
          className="checkbox"
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
