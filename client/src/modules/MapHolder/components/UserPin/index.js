import React from "react"
import PropTypes from 'prop-types';

import { Marker } from "react-mapbox-gl";

import LocationOn from "@material-ui/icons/LocationOn"

const UserPin = ({
  coordinates,
  classes,
}) => {
  return (
    <Marker
      className={classes.marker}
      coordinates={coordinates}
    >
        <LocationOn
          alt="New map pin"
          className={classes.pin}
        />
    </Marker>
  )
}

UserPin.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}


export default UserPin;