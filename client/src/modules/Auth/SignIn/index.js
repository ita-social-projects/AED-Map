import React, { Fragment } from 'react';
import ModalWrapper from '../../../shared/ModalWrapper';
import SignInModal from './components/SignInModal';
import ButtonSignIn from './components/ButtonSignIn';
import ButtonUser from './components/ButtonUser';

const auth = false;

const SignIn = () => {
  return (
    <Fragment>
      {auth ? (
        <ButtonUser />
      ) : (
        <ModalWrapper ButtonOpen={ButtonSignIn} ModalContent={SignInModal} />
      )}
    </Fragment>
  );
};

export default SignIn;
