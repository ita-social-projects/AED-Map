import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Formik } from 'formik';
import cancelToken from '../../../../../../shared/cancel-token';
import { signUpUser } from '../../../../api';
import { INITIAL_VALUES } from './const';
import SignUpSchema from './validator';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

const SignUpCancelToken = cancelToken();

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignUpModal = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    try {
      const { data } = await signUpUser(values);
      const { message } = data;
      resetForm();
      setSuccess(message);
    } catch (e) {
      const { errors } = e.response.data;
      setErrors(errors);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    return () => {
      SignUpCancelToken.cancel();
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Header />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => <Form isSubmitting={isSubmitting} />}
        </Formik>

        <Footer success={success} />
      </div>
    </Container>
  );
};

export default SignUpModal;
