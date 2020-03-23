import React from 'react';
import PropTypes from 'prop-types';
import ButtonModalPhoto from './ButtonModalPhoto';
import ModalPhotoContent from './ModalPhotoContent';
import ModalWrapper from '../../../../../shared/ModalWrapper';

const ModalPhoto = ({ images }) => {
  return (
    <ModalWrapper
      ButtonOpen={ButtonModalPhoto}
      ModalContent={({ handleClose }) => (
        <ModalPhotoContent
          images={images}
          handleClose={handleClose}
        />
      )}
    />
  );
};

ModalPhoto.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      filename: PropTypes.string
    })
  ).isRequired
};

export default ModalPhoto;
