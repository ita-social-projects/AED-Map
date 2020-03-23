import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  Button,
  Input
} from '@material-ui/core';

const useStyles = makeStyles({
  textField: {
    whiteSpace: 'pre-line'
  },
  uploadInput: {
    display: 'none'
  },
  uploadLabel: {
    display: 'inline-block',
    marginTop: 10,
    marginBottom: 10
  },
  imageField: {
    display: 'none'
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

const MyInputBase = props => {
  const [field] = useField(props);

  return (
    <InputBase
      className="text-input"
      {...field}
      {...props}
    />
  );
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

const UploadButton = ({
  children,
  handleUpload,
  htmlFor,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <input
        accept=".jpg, .jpeg, .png, .svg, .webp"
        type="file"
        multiple
        onChange={handleUpload}
        id={htmlFor}
        className={classes.uploadInput}
      />
      <label
        htmlFor={htmlFor}
        className={classes.uploadLabel}
      >
        <Button
          component="span"
          variant="contained"
          color="primary"
          {...props}
        >
          {children}
        </Button>
      </label>
    </>
  );
};

UploadButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  handleUpload: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired
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

const MyImageField = ({ label, id, name, setFieldValue, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Input
        type="file"
        inputProps={{
          accept: 'image/*',
          multiple: true
        }}
        name={name}
        id={id}
        className={classes.imageField}
        onChange={e => {
          setFieldValue('images', e.currentTarget.files);
        }}
      />
      
      <InputLabel htmlFor={id}>
        <Button {...props} component='span'>
          { label }
        </Button>
      </InputLabel>
    </div>
  );
};

MyImageField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export { MyTextField, MySelect, MyInputBase, MyImageField, UploadButton };
