import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';
import { MyTextField } from '../../../../../../../../../../shared/Fields';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Form = ({ isSubmitting }) => {
  const classes = useStyles();

  return (
    <FormFormik className={classes.form} noValidate>
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Електронна адреса"
        name="email"
        autoComplete="email"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Відновити пароль
      </Button>
    </FormFormik>
  );
};

Form.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
