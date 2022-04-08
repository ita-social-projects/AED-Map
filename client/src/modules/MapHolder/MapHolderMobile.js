import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
import {
  setGeolocation,
  startWatchingPosition
} from './actions/userLocation';
import GeoLocationButtonMobile from './components/GeoLocationButton/GeoLocationButtonMobile';
import QuickSearchButtonMobile from './components/QuickSearchButton/QuickSearchButtonMobile';
import RouteDetailsMobile from './components/RouteDetails/RouteDetailsMobile';
import UserPin from './components/UserPin';
import { getDirections } from './api';
import { MAPBOX_TOKEN } from '../../consts/keys';
import { fetchDefs } from '../Sidebar/components/ItemList/actions/list.js';
import ResetButton from './components/ResetButton';

const useStyles = makeStyles(() => ({
  mapContainer: () => ({
    position: 'relative',
    height: '100vh',
    width: '100vw'
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
  buttonContainer: () => ({
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    height: '80px',
    width: '100vw',
    backgroundColor: 'white',
    zIndex: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  }),
  buttonItem: () => ({
    paddingTop: '10px',
    width: '33%',
    alignSelf: 'center',
    color: '#1A73E8',
    fontSize: '12px',
    height: '80px',
    textAlign: 'center',
    cursor: 'pointer',
    minWidth: '70px'
  }),
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
  accessToken: MAPBOX_TOKEN
});

const MapHolderMobile = ({
  fetchDefItems,
  mapState,
  userPosition,
  newPoint,
  setMapCenter,
  startWatchingPosition,
  setGeolocation,
  addNewPoint,
  hidePopup,
  visible
}) => {
  const classes = useStyles({ visible });
  const [map, setLocalMap] = useState(null);
  const { lng, lat, zoom } = mapState;

  const handlePopupClose = event => {
    if (event.target.tagName === 'CANVAS') {
      hidePopup();
    }
  };
  useEffect(() => {
    fetchDefItems();
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

  const getCurrentLocation = _ => {
    setGeolocation(({ latitude, longitude }) => {
      setMapCenter({
        lng: longitude,
        lat: latitude
      });
    });
  };

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

  const getRouteToPosition = async (endLng, endLat) => {
    await setMapCenter({ lng: endLng, lat: endLat });
    getRoute(userPosition.coords, {
      lng: endLng,
      lat: endLat
    });
  };

  const [routeCoords, setRouteCords] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    distance: null,
    duration: null
  });
  const [showRouteDetails, setShowRouteDetails] = useState(
    false
  );

  const getRoute = async (start, endPosition) => {
    const query = await getDirections(start, endPosition);
    const data = query.data.routes[0];

    setRouteCords(data.geometry.coordinates);
    setShowRouteDetails(true);
    setRouteDetails({
      distance: data.distance,
      duration: data.duration
    });
  };

  const closeRoute = () => {
    setRouteCords([]);
    setShowRouteDetails(false);
    getCurrentLocation();
  };

  return (
    <div className={classes.mapContainer}>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonItem}>
          <GeoLocationButtonMobile
            currentLocation={getCurrentLocation}
          />
        </div>
        <div className={classes.buttonItem}>
          <QuickSearchButtonMobile
            getRouteToPosition={getRouteToPosition}
          />
        </div>
        <div
          className={classes.buttonItem}
          onClick={closeRoute}
        >
          <ResetButton closeRoute={closeRoute} />
        </div>
      </div>

      {showRouteDetails && (
        <RouteDetailsMobile
          onClose={closeRoute}
          details={routeDetails}
        />
      )}

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

        {routeCoords.length > 0 && (
          <>
            <RouteLayer coordinates={routeCoords} />
            <PointLayer coordinates={routeCoords} />
          </>
        )}
      </Map>
    </div>
  );
};

MapHolderMobile.defaultProps = {
  mapState: {},
  setVisible: {},
  visible: null,
  setMapCenter: () => {},
  setGeolocation: () => {},
  startWatchingPosition: () => {},
  hidePopup: () => {}
};

MapHolderMobile.propTypes = {
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
  visible: PropTypes.bool,
  fetchDefItems: PropTypes.func
};

export default connect(
  state => ({
    defsState: state.defs,
    mapState: state.mapState,
    newPoint: state.newPoint,
    userPosition: state.userPosition
  }),
  dispatch => ({
    fetchDefItems: params => dispatch(fetchDefs(params)),
    setGeolocation: f => dispatch(setGeolocation(f)),
    startWatchingPosition: () =>
      dispatch(startWatchingPosition()),
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    addNewPoint: newPoint =>
      dispatch(addNewPoint(newPoint)),
    hidePopup: () => dispatch(hidePopup())
  })
)(MapHolderMobile);
