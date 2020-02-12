import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'formik';
import FormButtons from './FormButtons';
import {
  MyTextField,
  MySelect
} from '../../../../../../shared/Fields';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 25px',
    marginTop: 30,
    overflowY: 'auto'
  },
  inputs: {
    margin: theme.spacing(1),
    width: '100%'
  }
}));

const FormFormik = ({ onSubmit }) => {
  const classes = useStyles();
  const languageInterface = [
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
      <MyTextField
        label="Назва"
        name="title"
        variant="outlined"
        className={classes.inputs}
      />
      <MyTextField
        label="Адреса"
        name="address"
        variant="outlined"
        className={classes.inputs}
      />
      <MySelect
        labelTitle="Мова інтерфейсу"
        label="language"
        name="language"
        options={languageInterface}
        variant="outlined"
        classes={classes.inputs}
      />
      <FormButtons />
    </Form>
  );
};

FormFormik.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormFormik;
