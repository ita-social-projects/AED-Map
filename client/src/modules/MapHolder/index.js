import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import PopupHolder from './components/PopupHolder';
import {
  setMapCenter,
  setMapZoom
} from './actions/mapState';
import { hidePopup } from './actions/popupDisplay';
import DefibrillatorPinLayer from './layers/DefibrillatorPinLayer';
import { sidebarWidth } from '../Sidebar/styleConstants';

const useStyles = makeStyles(() => ({
  mapContainer: ({ visible }) => ({
    position: 'relative',
    height: '100vh',
    width: visible
      ? `calc(100vw - ${sidebarWidth})`
      : '100vw',
    overflow: 'hidden'
  }),
  map: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  showIcon: {
    position: 'fixed',
    height: 64,
    margin: '10px 0 0 10px',
    zIndex: 1,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    borderRadius: '50%'
  },
  showMenuIcon: ({ visible }) => ({
    height: 35,
    width: 35,
    transform: `${
      visible ? 'rotate(180deg)' : 'rotate(0)'
    }`,
    transition: 'transform 0.2s'
  })
}));

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA'
});

const MapHolder = ({
  mapState,
  setMapCenter,
  hidePopup,
  setVisible,
  visible
}) => {
  const classes = useStyles({ visible });
  const [map, setLocalMap] = useState(null);
  const handlePopupClose = event => {
    if (event.target.tagName === 'CANVAS') {
      hidePopup();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handlePopupClose);
    return () => {
      document.removeEventListener(
        'click',
        handlePopupClose
      );
    };
    // eslint-disable-next-line
  }, []);

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

  const hideSidebar = () => {
    if (map) {
      setVisible(prev => !prev);

      setTimeout(() => {
        map.resize();
      }, 100);
    }
  };

  return (
    <div className={classes.mapContainer}>
      <Button
        className={classes.showIcon}
        color="primary"
        onClick={hideSidebar}
        size="small"
      >
        <ChevronRightIcon
          className={classes.showMenuIcon}
        />
      </Button>
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/oskovbasiuk/ck5nwya36638v1ilpmwxlfv5g"
        className={classes.map}
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
    </div>
  );
};

MapHolder.defaultProps = {
  mapState: {},
  setVisible: {},
  visible: null,
  setMapCenter: () => {},
  hidePopup: () => {}
};

MapHolder.propTypes = {
  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }),
  setMapCenter: PropTypes.func,
  hidePopup: PropTypes.func,
  setVisible: PropTypes.func,
  visible: PropTypes.bool
};

export default connect(
  state => ({
    defsState: state.defs,
    mapState: state.mapState
  }),
  dispatch => ({
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    hidePopup: () => dispatch(hidePopup())
  })
)(MapHolder);
