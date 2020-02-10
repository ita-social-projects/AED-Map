/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Cluster, Marker } from 'react-mapbox-gl';
import geoJsonData from '../geoJsonData';
import { defsSearchSelector } from '../../Sidebar/components/ItemList/reducers/listReducer';
import { showPopup } from '../actions/popupDisplay';
import mapPin from '../../../icons/map-marker-point.svg';

const useStyles = makeStyles(() => ({
  clusterMarker: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#7c7c7c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #7c7c7c',
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
    fontSize: 18,
    cursor: 'pointer'
  },
  title: {
    width: 300
  },
  pin: {
    width: 30,
    height: 30
  }
}));

const DefibrillatorPinLayer = ({
  filteredDefs,
  showPopup
}) => {
  const GEO_JSON_DATA = geoJsonData(filteredDefs);
  const classes = useStyles();
  const defibrillatorPinClick = feature => {
    const { defID } = feature.properties;
    const { coordinates } = feature.geometry;
    showPopup({
      data: {
        id: defID
      },
      coordinates
    });
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
    >
      {clusterRender}
    </Cluster>
  );
};

DefibrillatorPinLayer.defaultProps = {
  map: {},
  filteredDefs: [],
  showPopup: () => null
};

DefibrillatorPinLayer.propTypes = {
  map: PropTypes.shape({
    getCanvas: PropTypes.func,
    getZoom: PropTypes.func,
    getSource: PropTypes.func,
    easeTo: PropTypes.func
  }),
  filteredDefs: PropTypes.arrayOf(
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

  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired
};

export default connect(
  state => ({
    filteredDefs: defsSearchSelector(state),
    mapState: state.mapState
  }),
  dispatch => ({
    showPopup: popupInfo => dispatch(showPopup(popupInfo))
  })
)(DefibrillatorPinLayer);
