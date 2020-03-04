import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
} from '@material-ui/core';

const useStyles = makeStyles({
  textField: {
    whiteSpace: 'pre-line'
  }
});

const MyTextField = props => {
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

const MyInputBase = (props) => {
  const [field, meta] = useField(props);

  return (
    <InputBase
      className="text-input"
      helperText={meta.touched ? meta.error : ''}
      error={meta.touched && Boolean(meta.error)}
      {...field}
      {...props}
    />
  );
};

MyCheckbox.propTypes = {
  label: PropTypes.string.isRequired
};

const MySelect = ({
  label,
  labelTitle,
  options,
  variant,
  classes,
  ...props
}) => {
  const [field] = useField(props);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl className={classes} variant={variant}>
      <InputLabel id={label} ref={inputLabel}>
        {labelTitle}
      </InputLabel>
      <Select
        labelId={label}
        labelWidth={labelWidth}
        {...field}
        {...props}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option || <em>всі</em>}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MySelect.defaultProps = {
  variant: null,
  classes: null
};

MySelect.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
  classes: PropTypes.string
};

export { MyTextField, MyCheckbox, MySelect, MyInputBase};
