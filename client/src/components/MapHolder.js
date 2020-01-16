import React from 'react';
import mapPin from '../icons/icons-location-world.png';
import Map from './Map';
import SYMBOL_LAYOUT from '../symbolLayout';
import geoJsonData from '../geoJsonData';
import { defsFilterSelector } from '../reducers/defReducer';
import { connect } from 'react-redux';
import { GeoJSONLayer, Image } from 'react-mapbox-gl';

import { createUseStyles } from 'react-jss';

import { SIDEBAR_WIDTH } from '../consts/defSizesOfComponents';

const useStyle = createUseStyles({
  mapOuterStyle: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    width: `calc(100vw - ${SIDEBAR_WIDTH})`,
  },
});

const MapHolder = ({ filteredDefs, mapState }) => {
  const classes = useStyle();
  const GEO_JSON_DATA = geoJsonData(filteredDefs);
  const { lng, lat, zoom } = mapState;

  const symbolClick = (event) => {
    event.target.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
    });
  };

  const mouseEnter = (event) => {
    event.target.getCanvas().style.cursor = 'pointer';
  };

  const mouseLeave = (event) => {
    event.target.getCanvas().style.cursor = '';
  };

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v11"
      className={classes.mapOuterStyle}
      center={[lng, lat]}
      zoom={[zoom]}>
      <Image
        id={'pointer'}
        url={mapPin}
        options={{ pixelRatio: 2 }}
      />
      <GeoJSONLayer
        id={'points'}
        type={'symbol'}
        data={GEO_JSON_DATA}
        symbolLayout={SYMBOL_LAYOUT}
        symbolOnClick={symbolClick}
        symbolOnMouseEnter={mouseEnter}
        symbolOnMouseLeave={mouseLeave}
      />
    </Map>
  );
};

const mapStateToProps = (state) => ({
  defsState: state.defs,
  filter: state.filter,
  filteredDefs: defsFilterSelector(state),
  mapState: state.map,
});

export default connect(mapStateToProps, null)(MapHolder);
