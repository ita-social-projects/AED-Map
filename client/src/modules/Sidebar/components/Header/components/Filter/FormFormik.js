import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'formik';
import FormButtons from './FormButtons';
import {
  MyTextField,
  MySelect
} from '../../../../../../shared/Fields';
import {
  languageInterface,
  informationalPlates
} from './consts/formConsts';

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

  return (
    <Form
      className={classes.form}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <MyTextField
        label="Назва"
        name="title"
        className={classes.inputs}
      />
      <MySelect
        labelTitle="Мова інтерфейсу"
        label="language"
        name="language"
        options={languageInterface}
        classes={classes.inputs}
      />
      <MySelect
        labelTitle="Інформаційні таблички"
        label="informational_plates"
        name="informational_plates"
        options={informationalPlates}
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
