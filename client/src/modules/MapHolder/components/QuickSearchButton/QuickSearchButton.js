import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAvailableDefItems} from '../../../Sidebar/api/index.js';
import useAlert from '../../../../shared/Alert/useAlert';

const getNearestDeviceButton = {
  fontSize: '0.8rem',
  fontWeight: '900',
  color: 'white',
  width: '80px',
  height: '80px',
  cursor: 'pointer',
  position: 'fixed',
  bottom: '5%',
  right: '8px',
  zIndex: '30',
  backgroundColor: 'red',
  borderRadius: '50%',
  boxShadow: '0px 0px 25px black',
  border: '2px solid rgba(0, 0, 0, 0.6)',
};

function QuickSearchButton({ coords, geolocationProvided, getRouteToPosition }) {
  const [, ShowAlert] = useAlert();

  const getNearestDefibrillators = async () => {
    let nearestItem;
    if (geolocationProvided) {
      nearestItem = await getAvailableDefItems({
        longitude: coords.lng,
        latitude: coords.lat,
      });
    } else {
      ShowAlert({
        open: true,
        severity: 'error',
        message: 'Позиція користувача не знайдена',
      });
      return;
    }

    if (nearestItem.data.listDefs) {
      const [lng, lat] = nearestItem.data.listDefs.location.coordinates;
      await getRouteToPosition(lng, lat);
    } else {
      ShowAlert({
        open: true,
        severity: 'error',
        message: 'Пристроїв поблизу не виявлено',
      });
    }
  };

  return (
    <button
      style={getNearestDeviceButton}
      type="button"
      onClick={getNearestDefibrillators}
    >
      Знайти пристрій
    </button>
  );
}

QuickSearchButton.propTypes = {
  coords: PropTypes.object.isRequired,
  getRouteToPosition: PropTypes.func.isRequired
};

export default connect((state) => ({
  coords: state.userPosition.coords,
  geolocationProvided: state.userPosition.geolocationProvided,
}),null)(QuickSearchButton);
