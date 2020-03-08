import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popup } from 'react-mapbox-gl';
import DefContent from './PopupContent/DefibrillatorPopupContent';
import { popupOffsets } from '../consts';

const PopupHolder = ({ popupData }) => {
  return (
    <>
      {popupData && (
        <Popup
          coordinates={popupData.coordinates}
          offset={popupOffsets}
        >
          <DefContent id={popupData.data.id} />
        </Popup>
      )}
    </>
  );
};

PopupHolder.defaultProps = {
  popupData: null
};

PopupHolder.propTypes = {
  popupData: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string
    }),
    coordinates: PropTypes.arrayOf(PropTypes.number)
  })
};

export default connect(state => ({
  popupData: state.popupData
}))(PopupHolder);
