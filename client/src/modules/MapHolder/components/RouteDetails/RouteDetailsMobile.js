import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../../icons/clock.svg';

const detailsStyle = {
  container: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 1)',
    position: 'fixed',
    bottom: '90px',
    right: '25px',
    zIndex: '30',
    backgroundColor: 'rgba(40, 44, 52, 1)',
    borderRadius: '5px',
    border: '2px solid rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    width: '160px'
  },
  logo: {
    width: '20px',
    marginRight: '3px'
  }
};

function RouteDetails({ details }) {
  const { distance, duration } = details;
  const finalDistance = (distance / 1000).toFixed(2);
  const approximateTime = Math.floor(duration / 60);

  return (
    <>
      <div style={detailsStyle.container}>
        <img
          src={Logo}
          alt="сlock"
          style={detailsStyle.logo}
        />
        <p>
          {' '}
          {approximateTime}хв{' '}
          <span>({finalDistance}км)</span>
        </p>
      </div>
    </>
  );
}

RouteDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
};

export default RouteDetails;
