import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1),
    width: 250
  },
  select: {
    margin: theme.spacing(1),
    width: 250
  }
}));

export const MyTextField = props => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <TextField
      variant="outlined"
      className={classes.input}
      helperText={meta.touched ? meta.error : ''}
      error={meta.touched && Boolean(meta.error)}
      {...field}
      {...props}
    />
  );
};

export const MySelect = ({
  label,
  labelTitle,
  options,
  ...props
}) => {
  const classes = useStyles();
  const [field] = useField(props);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      className={classes.select}
      variant="outlined"
    >
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
            {option || <em>Всі</em>}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MySelect.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};
