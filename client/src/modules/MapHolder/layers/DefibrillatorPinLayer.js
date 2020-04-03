/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Cluster, Marker } from 'react-mapbox-gl';
import { withRouter } from 'react-router-dom';
import geoJsonData from '../geoJsonData';
import { setActive } from '../../Sidebar/components/ItemList/actions/list';
import { showPopup } from '../actions/popupDisplay';
import mapPin from '../../../icons/map-pin-icon.jpg';

const useStyles = makeStyles(() => ({
  clusterMarker: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(124, 124, 124, 0.9)',
    boxShadow: '1px 1px 3px rgba(124, 124, 124, 0.9)',
    color: 'white',
    fontWeight: 900,
    cursor: 'pointer'
  },
  marker: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerWrapper: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textShadow: '1px 1px 2px white',
    cursor: 'pointer'
  },
  title: {
    width: 200
  },
  pin: {
    width: 30,
    height: 30
  }
}));

const DefibrillatorPinLayer = ({
  defibrillators,
  showPopup,
  makeItemActive,
  history
}) => {
  const GEO_JSON_DATA = geoJsonData(defibrillators);
  const classes = useStyles();

  const defibrillatorPinClick = feature => {
    const { defID } = feature.properties;
    const { coordinates } = feature.geometry;
    const currentRoute = window.location.pathname;
    if (
      currentRoute !== '/add-form' &&
      !currentRoute.includes('/edit-form')
    ) {
      showPopup({
        data: {
          id: defID
        },
        coordinates
      });
      makeItemActive(defID);
      history.push(`/?id=${defID}`);
    }
  };

  const clusterRender = GEO_JSON_DATA.features.map(
    feature => {
      return (
        <Marker
          className={classes.marker}
          key={feature.properties.defID}
          coordinates={feature.geometry.coordinates}
          onClick={() => defibrillatorPinClick(feature)}
        >
          <div className={classes.markerWrapper}>
            <img
              alt="Map pin"
              src={mapPin}
              className={classes.pin}
            />
            <p className={classes.title}>
              {feature.properties.title}
            </p>
          </div>
        </Marker>
      );
    }
  );

  const clusterMarker = (coordinates, pointCount) => {
    return (
      <Marker
        key={coordinates}
        coordinates={coordinates}
        className={classes.clusterMarker}
      >
        {pointCount}
      </Marker>
    );
  };

  return (
    <Cluster
      ClusterMarkerFactory={clusterMarker}
      zoomOnClick
      zoomOnClickPadding={80}
      radius={100}
    >
      {clusterRender}
    </Cluster>
  );
};

DefibrillatorPinLayer.defaultProps = {
  map: {},
  defibrillators: [],
  showPopup: () => null
};

DefibrillatorPinLayer.propTypes = {
  map: PropTypes.shape({
    getCanvas: PropTypes.func,
    getZoom: PropTypes.func,
    getSource: PropTypes.func,
    easeTo: PropTypes.func
  }),
  defibrillators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      }),
      actual_date: PropTypes.string,
      floor: PropTypes.number,
      storage_place: PropTypes.string,
      accessibility: PropTypes.string,
      language: PropTypes.string,
      informational_plates: PropTypes.string,
      phone: PropTypes.arrayOf(PropTypes.string),
      additional_information: PropTypes.string
    })
  ),
  showPopup: PropTypes.func,
  makeItemActive: PropTypes.func.isRequired,

  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired,
  history: PropTypes.shape().isRequired
};

export default connect(
  state => ({
    defibrillators: state.defs.mapData,
    mapState: state.mapState
  }),
  dispatch => ({
    showPopup: popupInfo => dispatch(showPopup(popupInfo)),
    makeItemActive: itemId => dispatch(setActive(itemId))
  })
)(withRouter(DefibrillatorPinLayer));
