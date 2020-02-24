import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';
import { MyTextField } from '../../../../../../../../shared/Fields';
import InputAdornmentPassword from './components/InputAdornmentPassword';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = ({ email, isSubmitting }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const redirectToMainPage = () => {
    history.push('/');
  };

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
        value={email}
        disabled
      />
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="password"
        InputProps={{
          endAdornment:
            (<InputAdornmentPassword
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />)
        }}
      />
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="passwordConfirm"
        label="Підтвердження пароля"
        type={showPassword ? 'text' : 'password'}
        id="passwordConfirm"
        autoComplete="passwordConfirm"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Реєстрація
      </Button>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={redirectToMainPage}
      >
        Головна сторінка
      </Button>
    </FormFormik>
  );
};

Form.propTypes = {
  email: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
