import React, { useState } from 'react';
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

const useStyles = makeStyles(() => ({
  mapOuter: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  mapInner:{
    display:'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  showIcon:{
    position:'fixed',
    zIndex:'1',
    height:'64px',
    backgroundColor:'rgba(33, 150, 243, 0.2)',
    margin:'10px 0 0 10px',
    borderRadius:'50%',
  },
  showMenuIcon:props=>({
    height:'35px',
    width:'35px',
    transform: `${props.visible ? 'rotate(180deg)' : 'rotate(0)'}`,
    transition:'0.2s transform',
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
  visible,
}) => {
  const classes = useStyles({visible});
  // const changeOuterClass = visible ? classes.mapOuter : classes.mapOuterChanged;
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
    <div className={classes.mapOuter}>
      <Button 
        className={classes.showIcon}
        color='primary'
        onClick={()=>setVisible(prev => !prev)}
        size='small'
      >
        <ChevronRightIcon className={classes.showMenuIcon} />
      </Button>
      <Map
      // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/oskovbasiuk/ck5nwya36638v1ilpmwxlfv5g"
        className={classes.mapInner}
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
  setMapCenter: ()=>{},
  hidePopup: ()=>{},
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
  visible: PropTypes.bool,
};

export default connect(
  state => ({
    defsState: state.defs,
    filteredDefs: state.defs.data,
    mapState: state.mapState
  }),
  dispatch => ({
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    hidePopup: () => dispatch(hidePopup())
  })
)(MapHolder);
