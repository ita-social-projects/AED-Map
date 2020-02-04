import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';
import { MyTextField, MyCheckbox } from '../../../../../../../shared/Fields';
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

const Form = ({ isSubmitting }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
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
      <MyCheckbox
        color="primary"
        id="remember"
        label="Запам'ятати мене"
        name="remember"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Вхід
      </Button>
    </FormFormik>
  );
};

Form.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
