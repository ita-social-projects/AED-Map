import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Formik } from 'formik';
import { INITIAL_VALUES } from './const';
import AuthSchema from './validator';
import Header from './components/Header';
import Form from './components/Form';

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignInModal = ({ handleClose }) => {
  const classes = useStyles();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
      handleClose();
    }, 400);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Header />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={AuthSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => <Form isSubmitting={isSubmitting} />}
        </Formik>
      </div>
    </Container>
  );
};

export default SignInModal;
