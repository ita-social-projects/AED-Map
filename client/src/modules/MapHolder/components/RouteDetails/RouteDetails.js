import React from 'react';
import PropTypes from 'prop-types';

const detailsStyle = {
  container: {
    fontFamily: 'TimeNewRoman',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'darkGrey',
    position: 'fixed',
    bottom: '5%',
    right: '17%',
    zIndex: '30',
    backgroundColor: 'white',
    borderRadius: '5%',
    border: '2px solid rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    padding: '10px',
  },
  button: {
    backgroundColor: 'darkGrey',
    padding: '2px',
    borderRadius: '25%',
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
};

function RouteDetails({ onClose, details }) {
  const { distance, duration } = details;
  const finalDistance = (distance / 1000).toFixed(2);
  const approximateTime = Math.floor(duration / 60);

  return (
    <div style={detailsStyle.container}>
      <p>{approximateTime}хв</p>
      <p>({finalDistance}км) </p>
      <button style={detailsStyle.button} type="button" onClick={onClose}>
        X
      </button>
    </div>
  );
}

RouteDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};

export default RouteDetails;