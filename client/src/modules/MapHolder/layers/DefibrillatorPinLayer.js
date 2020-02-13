/* eslint-disable no-param-reassign */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GeoJSONLayer } from 'react-mapbox-gl';
import geoJsonData from '../geoJsonData';
import SYMBOL_LAYOUT from '../symbolLayout';
import {
  setMapCenter,
  setMapZoom
} from '../actions/mapState';
import { defsSearchSelector } from '../../Sidebar/components/ItemList/reducers/listReducer';
import { showPopup } from '../actions/popupDisplay';

const DefibrillatorPinLayer = ({
  filteredDefs,
  map,
  setMapCenterCoords,
  showPopup
}) => {
  const GEO_JSON_DATA = geoJsonData(filteredDefs);

  const defibrillatorPinClick = event => {
    const { defID } = event.features[0].properties;
    const coords = event.features[0].geometry.coordinates;

    setMapCenterCoords({
      lng: coords[0],
      lat: coords[1]
    });

    showPopup({
      data: {
        id: defID
      },
      coordinates: coords
    });
  };

  const mouseEnter = () => {
    map.getCanvas().style.cursor = 'pointer';
  };

  const mouseLeave = () => {
    map.getCanvas().style.cursor = '';
  };

  return (
    <GeoJSONLayer
      data={GEO_JSON_DATA}
      symbolLayout={SYMBOL_LAYOUT}
      symbolOnClick={defibrillatorPinClick}
      symbolOnMouseEnter={mouseEnter}
      symbolOnMouseLeave={mouseLeave}
    />
  );
};

DefibrillatorPinLayer.defaultProps = {
  map: {},
  filteredDefs: [],
  setMapCenterCoords: () => null,
  showPopup: () => null
};

DefibrillatorPinLayer.propTypes = {
  map: PropTypes.shape({
    getCanvas: PropTypes.func,
    getZoom: PropTypes.func
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
  setMapCenterCoords: PropTypes.func,
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
    setMapCenterCoords: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    showPopup: popupInfo => dispatch(showPopup(popupInfo))
  })
)(DefibrillatorPinLayer);
