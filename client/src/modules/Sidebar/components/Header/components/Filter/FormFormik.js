import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'formik';
import FormButtons from './FormButtons';
import {
  MyTextField as OutlinedInput,
  MySelect as OutlinedSelect
} from './MyOutlinedInputs';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  input: {
    margin: theme.spacing(1),
    width: 250
  }
}));

const FormFormik = ({ onSubmit }) => {
  const classes = useStyles();
  const selectOptions = [
    '',
    'англомовний',
    'україномовний',
    'російськомовний'
  ];

  return (
    <Form
      className={classes.form}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <OutlinedInput label="Назва" name="title" />
      <OutlinedInput label="Адреса" name="address" />
      <OutlinedSelect
        labelTitle="Мова інтерфейсу"
        label="language"
        name="language"
        options={selectOptions}
      />
      <FormButtons />
    </Form>
  );
};

FormFormik.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormFormik;
