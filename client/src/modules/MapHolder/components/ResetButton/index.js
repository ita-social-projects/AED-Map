import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../../icons/route.svg';

function ResetButton({ closeRoute }) {
  return (
    <div onClick={closeRoute}>
      <img src={Logo} alt="search" />
      <div>Очистити</div>
      <div>результат пошуку</div>
    </div>
  );
}

ResetButton.propTypes = {
  closeRoute: PropTypes.func
};

export default ResetButton;
