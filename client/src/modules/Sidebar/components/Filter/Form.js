import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormButtons from './FormButtons';
import FormSelect from './FormSelect';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    margin: 8,
    width: 250
  }
});

const Form = ({
  values,
  handleChange,
  handleReset,
  handleSubmit
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.input}
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
      />
      <TextField
        className={classes.input}
        label="Address"
        name="address"
        value={values.address}
        onChange={handleChange}
      />
      <FormSelect
        language={values.language}
        handleChange={handleChange}
      />
      <FormButtons handleReset={handleReset} />
    </form>
  );
};

Form.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Form;
