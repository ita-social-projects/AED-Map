import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defsFilterSelector } from '../../../../../../reducers/defReducer';
import { setMap } from '../../../../../../actions/map';
import myClasses from '../../../../../../styles';

const DefItem = ({
  defItemInfo,
  setMapParams,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const handleClick = () => {
    const [lng, lat] = defItemInfo.location.coordinates;
    const mapParams = {
      lng,
      lat,
      zoom: 18
    };
    setMapParams(mapParams);
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      const [lng, lat] = defItemInfo.location.coordinates;
      const mapParams = {
        lng,
        lat,
        zoom: 18
      };
      setMapParams(mapParams);
    }
  };

  return (
    <div
      className={myClasses.pointCard}
      style={styleParam}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <h3 className={myClasses.titleStyle}>
        {defItemInfo.title}
      </h3>
      <p className={myClasses.descStyle}>
        {defItemInfo.additional_information}
      </p>
    </div>
  );
};
DefItem.defaultProps = {
  defItemInfo: {},
  setMapParams: () => null
};
DefItem.propTypes = {
  defItemInfo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
    actual_date: PropTypes.string,
    floor: PropTypes.number,
    storage_place: PropTypes.string,
    accessibility: PropTypes.string,
    language: PropTypes.string,
    informational_plates: PropTypes.bool,
    phone: PropTypes.arrayOf(PropTypes.string),
    additional_information: PropTypes.string
  }),
  setMapParams: PropTypes.func
};

export default connect(
  state => ({
    filteredDefs: defsFilterSelector(state)
  }),
  {
    setMapParams: setMap
  }
)(DefItem);
