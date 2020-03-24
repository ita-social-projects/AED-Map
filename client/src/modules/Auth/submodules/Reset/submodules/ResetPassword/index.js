import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Formik } from 'formik';
import cancelToken from '../../../../../../shared/cancel-token';
import { resetUser } from '../../../../api';
import { INITIAL_VALUES } from './const';
import ResetSchema from './validator';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

const ResetCancelToken = cancelToken();

const useStyles = makeStyles(theme => ({
  background: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperOuter: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 1.5)
  },
  paperInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ResetPassword = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { email, token } = useParams();

  const handleSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    try {
      const { data } = await resetUser({ ...values, token });
      const { message } = data;
      resetForm();
      setSuccess(message);
    } catch (e) {
      const { message, errors } = e.response.data;
      setError(message);
      setErrors(errors);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    return () => {
      ResetCancelToken.cancel();
    };
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.paperOuter}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paperInner}>
            <Header />

            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={ResetSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => <Form email={email} isSubmitting={isSubmitting} />}
            </Formik>

            <Footer success={success} error={error} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ResetPassword;
