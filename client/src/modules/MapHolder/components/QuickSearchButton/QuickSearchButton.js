import React from 'react';
import {getAvailableDefItems} from '../../../Sidebar/api/index.js';
import {connect} from 'react-redux';
import useAlert from '../../../../shared/Alert/useAlert';

const getNearestDeviceButton = {
  fontFamily: 'TimeNewRoman',
  fontSize: '1rem',
  color: 'white',
  width: '80px',
  height: '80px',
  cursor: 'pointer',
  position: 'fixed',
  bottom: '5%',
  right: '1%',
  zIndex: '30',
  backgroundColor: 'red',
  borderRadius: '50%',
  boxShadow: '0px 0px 25px black',
  border: '2px solid rgba(0, 0, 0, 0.6)',
}

function QuickSearchButton ({coords,getRouteToNearestItem}) {
  const [,ShowAlert] = useAlert();

  const getNearestDefibrillators = async () => {
    const nearestItem = await getAvailableDefItems({
        longitude: coords.lng, 
        latitude: coords.lat, 
    });
    console.log(nearestItem.data.listDefs)
    if (nearestItem.data.listDefs) {
      const [lng,lat] = nearestItem.data.listDefs.location.coordinates;
      const args = [coords.lng,coords.lat,lng,lat];
      await getRouteToNearestItem(args)
    } else {
      ShowAlert({
        open: true,
        severity: 'error',
        message:
          'Пристроїв поблизу не виявлено'
      });
    }
  };

  return(
    <button style={getNearestDeviceButton} type='button' onClick={getNearestDefibrillators}>Знайти пристрій</button>
  )
}

export default connect(state => ({
  coords: state.userPosition.coords,
})
)(QuickSearchButton);