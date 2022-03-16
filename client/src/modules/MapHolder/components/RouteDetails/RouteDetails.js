import React from 'react';
import PropTypes from 'prop-types';

const detailsStyle = {
  container: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    position: 'fixed',
    bottom: '5%',
    right: '160px',
    zIndex: '30',
    backgroundColor: 'rgba(40, 44, 52, 1)',
    borderRadius: '5px',
    border: '2px solid rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px',
  },
  button: {
    backgroundColor: 'rgba(162, 165, 173, 1)',
    fontSize: '0.9rem',
    padding: '2px',
    marginTop: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

function RouteDetails({ onClose, details }) {
  const { distance, duration } = details;
  const finalDistance = (distance / 1000).toFixed(2);
  const approximateTime = Math.floor(duration / 60);

  return (
    <div style={detailsStyle.container}>
      <p>{approximateTime}хв <span>({finalDistance}км)</span></p>
      <button style={detailsStyle.button} type="button" onClick={onClose}>
        Cкасувати маршрут
      </button>
    </div>
  );
}

RouteDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};

export default RouteDetails;