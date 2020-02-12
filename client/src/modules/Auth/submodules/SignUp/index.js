import React from 'react';
import ModalWrapper from '../../../../shared/ModalWrapper';
import SignUpModal from './components/SignUpModal';
import ButtonSignUp from './components/ButtonSignUp';

const SignUp = () => (
  <ModalWrapper ButtonOpen={ButtonSignUp} ModalContent={SignUpModal} />
);

export default SignUp;
