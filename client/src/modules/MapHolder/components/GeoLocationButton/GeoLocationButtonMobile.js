import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../../../src/icons/place.svg';

function GeoLocationButtonMobile({ currentLocation }) {
  return (
    <>
      <div onClick={currentLocation}>
        <img src={Logo} alt="search" />
        <div>Показати моє</div>
        <div>місцезнаходження</div>
      </div>
    </>
  );
}

GeoLocationButtonMobile.propTypes = {
  currentLocation: PropTypes.func
};

export default GeoLocationButtonMobile;
