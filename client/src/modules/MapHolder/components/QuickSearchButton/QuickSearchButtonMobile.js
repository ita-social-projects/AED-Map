import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAvailableDefItems } from '../../../Sidebar/api/index.js';
import useAlert from '../../../../shared/Alert/useAlert';
import Logo from '../../../../../src/icons/logo.svg';

function QuickSearchButtonMobile({
  coords,
  geolocationProvided,
  getRouteToPosition
}) {
  const [, ShowAlert] = useAlert();

  const getNearestDefibrillators = async () => {
    let nearestItem;
    if (geolocationProvided) {
      nearestItem = await getAvailableDefItems({
        longitude: coords.lng,
        latitude: coords.lat
      });
    } else {
      ShowAlert({
        open: true,
        severity: 'error',
        message: 'Позиція користувача не знайдена'
      });
      return;
    }

    if (nearestItem.data.listDefs) {
      const [
        lng,
        lat
      ] = nearestItem.data.listDefs.location.coordinates;
      await getRouteToPosition(lng, lat);
    } else {
      ShowAlert({
        open: true,
        severity: 'error',
        message: 'Пристроїв поблизу не виявлено'
      });
    }
  };

  return (
    <div onClick={getNearestDefibrillators}>
      <img src={Logo} alt="search" />
      <div>Прокласти</div>
      <div>маршрут</div>
    </div>
  );
}

QuickSearchButtonMobile.propTypes = {
  coords: PropTypes.object.isRequired,
  getRouteToPosition: PropTypes.func.isRequired
};

export default connect(
  state => ({
    coords: state.userPosition.coords,
    geolocationProvided:
      state.userPosition.geolocationProvided
  }),
  null
)(QuickSearchButtonMobile);
