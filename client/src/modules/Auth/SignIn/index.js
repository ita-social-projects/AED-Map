import React from 'react';
import ModalWrapper from '../../../shared/ModalWrapper';
import SignInModal from './components/SignInModal';
import ButtonSignIn from './components/ButtonSignIn';
import ButtonUser from './components/ButtonUser';

const auth = false;

const SignIn = () => {
  return (
    <>
      {auth ? (
        <ButtonUser />
      ) : (
        <ModalWrapper ButtonOpen={ButtonSignIn} ModalContent={SignInModal} />
      )}
    </>
  );
};

export default SignIn;
