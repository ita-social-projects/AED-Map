import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Marker } from 'react-mapbox-gl';
import mapPin from '../../../icons/map-add-point.svg';

const useStyles = makeStyles(() => ({
  marker: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pin: {
    width: 40,
    height: 40
  }
}));

const AddedPin = ({ coordinates }) => {
  const classes = useStyles();
  return (
    <Marker
      className={classes.marker}
      coordinates={coordinates}
    >
      <div>
        <img
          alt="New map pin"
          src={mapPin}
          className={classes.pin}
        />
      </div>
    </Marker>
  );
};

AddedPin.propTypes = {
  coordinates: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }).isRequired
};

export default AddedPin;
