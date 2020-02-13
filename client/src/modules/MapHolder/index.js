import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import PopupHolder from './components/PopupHolder';
import {
  setMapCenter,
  setMapZoom
} from './actions/mapState';
import { hidePopup } from './actions/popupDisplay';
import { defsSearchSelector } from '../Sidebar/components/ItemList/reducers/listReducer';
import { sidebarWidth } from '../Sidebar/styleConstants';
import DefibrillatorPinLayer from './layers/DefibrillatorPinLayer';

const useStyles = makeStyles(() => ({
  mapOuterStyle: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    width: `calc(100vw - ${sidebarWidth})`
  }
}));

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA'
});

const MapHolder = ({
  mapState,
  setMapCenter,
  hidePopup
}) => {
  const classes = useStyles();

  const [map, setLocalMap] = useState(null);

  const loadMap = mapRaw => {
    if (mapRaw) {
      setLocalMap(mapRaw);
    }
  };

  const { lng, lat, zoom } = mapState;

  const changeMapCenterCoords = event => {
    setMapCenter(event.getCenter());
  };

  const onZoomEnded = event => {
    setMapCenter({
      ...event.getCenter(),
      zoom: event.getZoom()
    });
  };

  const onZoomStarted = () => {
    hidePopup();
  };

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/oskovbasiuk/ck5nwya36638v1ilpmwxlfv5g"
      className={classes.mapOuterStyle}
      center={[lng, lat]}
      zoom={[zoom]}
      onStyleLoad={loadMap}
      onZoomEnd={onZoomEnded}
      onZoomStart={onZoomStarted}
      onRotateEnd={changeMapCenterCoords}
      onDragEnd={changeMapCenterCoords}
    >
      {map ? <DefibrillatorPinLayer map={map} /> : null}
      <PopupHolder />
    </Map>
  );
};

MapHolder.propTypes = {
  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired,
  setMapCenter: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired
};

export default connect(
  state => ({
    defsState: state.defs,
    filteredDefs: defsSearchSelector(state),
    mapState: state.mapState
  }),
  dispatch => ({
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    hidePopup: () => dispatch(hidePopup())
  })
)(MapHolder);
