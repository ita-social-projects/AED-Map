import React from 'react';
import ButtonModalPhoto from './ButtonModalPhoto';
import ModalPhotoContent from './ModalPhotoContent';
import ModalWrapper from '../../../../../shared/ModalWrapper';

const ModalPhoto = () => {
  return (
    <ModalWrapper
      ButtonOpen={ButtonModalPhoto}
      ModalContent={ModalPhotoContent}
    />
  );
};

export default ModalPhoto;
