import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Formik } from 'formik';
import cancelToken from '../../../../../../../../shared/cancel-token';
import { signUpSendmail } from '../../../../../../api';
import { INITIAL_VALUES } from './const';
import SignUpSendmailSchema from './validator';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

const SignUpSendmailCancelToken = cancelToken();

const useStyles = makeStyles(() => ({
  container: {
    width: 444
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignUpSendmailModal = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    try {
      const { data } = await signUpSendmail(values);
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
      SignUpSendmailCancelToken.cancel();
    };
  }, []);

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Header />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={SignUpSendmailSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => <Form isSubmitting={isSubmitting} />}
        </Formik>

        <Footer success={success} />
      </div>
    </Container>
  );
};

export default SignUpSendmailModal;
