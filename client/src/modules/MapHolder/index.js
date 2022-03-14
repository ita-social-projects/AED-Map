import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';
import PopupHolder from './components/PopupHolder';
import {
  setMapCenter,
  setMapZoom,
  addNewPoint
} from './actions/mapState';
import { hidePopup } from './actions/popupDisplay';
import DefibrillatorPinLayer from './layers/DefibrillatorPinLayer';
import AddedPin from './layers/AddedPin';
import PointLayer from './layers/PointLayer';
import RouteLayer from './layers/RouteLayer';
import { sidebarWidth } from '../Sidebar/styleConstants';
import {
  setGeolocation,
  startWatchingPosition
} from './actions/userLocation';
import GeoLocationButton from './components/GeoLocationButton';
import QuickSearchButton from './components/QuickSearchButton';
import UserPin from './components/UserPin';

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
  userPosition,
  newPoint,
  setMapCenter,
  startWatchingPosition,
  setGeolocation,
  addNewPoint,
  hidePopup,
  setVisible,
  visible
}) => {
  const classes = useStyles({ visible });
  const [map, setLocalMap] = useState(null);
  const { lng, lat, zoom } = mapState;
  const tooltipMessage = visible
    ? 'Приховати меню'
    : 'Показати меню';

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

  const loadMap = async mapRaw => {
    if (mapRaw) {
      setLocalMap(mapRaw);
    }
  };

  const changeMapCenterCoords = event => {
    setMapCenter({
      ...event.getCenter(),
      zoom: event.getZoom()
    });
  };
  const onZoomEnded = event => {
    setMapCenter({
      ...mapState,
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
  //------------------обробник кнопки---------------------------
  const getCurrentLocation = _ => {
    setGeolocation(({ latitude, longitude }) => {
      setMapCenter({
        lng: longitude,
        lat: latitude
      });
    });
    console.log(userPosition);
  };
  //------------------обробник кнопки-----------------------------
  useEffect(() => {
    if (Object.keys(newPoint).length !== 0) {
      const { lng, lat } = newPoint;
      setMapCenter({ lng, lat });
    }
    // eslint-disable-next-line
  }, [newPoint]);

  //Sets map center to current Position of the user
  useEffect(() => {
    setGeolocation(({ longitude, latitude }) => {
      setMapCenter({ lng: longitude, lat: latitude });
      startWatchingPosition();
    });
  }, [setGeolocation, setMapCenter, startWatchingPosition]);
  const onDblClickMap = (_, event) => {
    const currentRoute = window.location.pathname;
    if (
      currentRoute === '/add-form' ||
      currentRoute.includes('/edit-form')
    ) {
      const { lng, lat } = event.lngLat;
      addNewPoint({ lng, lat });
      event.preventDefault();
    }
  };

  const getRouteToNearestItem = async (endLng, endLat) => {
    await setMapCenter({ lng: endLng, lat: endLat });
    getRoute([endLng, endLat]);
  };

  const [coordinates, setCoordinates] = useState([]);

  const getRoute = async ([endLng, endLat]) => {
    const accessToken =
      'pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA';
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat};${endLng},${endLat}?steps=true&geometries=geojson&access_token=${accessToken}`,
      { method: 'GET' }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    setCoordinates(route);
  };

  return (
    <div className={classes.mapContainer}>
      <QuickSearchButton
        getRouteToNearestItem={getRouteToNearestItem}
      />
      <GeoLocationButton
        currentLocation={getCurrentLocation}
      />
      <Button
        className={classes.showIcon}
        color="primary"
        onClick={hideSidebar}
        size="small"
      >
        <Tooltip title={tooltipMessage}>
          <ChevronRightIcon
            className={classes.showMenuIcon}
          />
        </Tooltip>
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
        onDblClick={onDblClickMap}
      >
        {map && <DefibrillatorPinLayer map={map} />}
        {userPosition.geolocationProvided && (
          <UserPin
            classes={classes}
            coordinates={userPosition.coords}
          />
        )}

        {Object.keys(newPoint).length !== 0 && (
          <AddedPin coordinates={newPoint} />
        )}

        <PopupHolder />

        {coordinates && (
          <>
            <RouteLayer coordinates={coordinates} />
            <PointLayer coordinates={coordinates} />
          </>
        )}
      </Map>
    </div>
  );
};

MapHolder.defaultProps = {
  mapState: {},
  setVisible: {},
  visible: null,
  setMapCenter: () => {},
  setGeolocation: () => {},
  startWatchingPosition: () => {},
  hidePopup: () => {}
};

MapHolder.propTypes = {
  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }),
  newPoint: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }).isRequired,
  addNewPoint: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func,
  setMapZoom: PropTypes.func,
  startWatchingPosition: PropTypes.func,
  hidePopup: PropTypes.func,
  setVisible: PropTypes.func,
  visible: PropTypes.bool
};

export default connect(
  state => ({
    defsState: state.defs,
    mapState: state.mapState,
    newPoint: state.newPoint,
    userPosition: state.userPosition
  }),
  dispatch => ({
    setGeolocation: f => dispatch(setGeolocation(f)),
    startWatchingPosition: () =>
      dispatch(startWatchingPosition()),
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    addNewPoint: newPoint =>
      dispatch(addNewPoint(newPoint)),
    hidePopup: () => dispatch(hidePopup())
  })
)(MapHolder);
