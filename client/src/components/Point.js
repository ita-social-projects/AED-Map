import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defsFilterSelector } from '../reducers/defReducer';
import { setMap } from '../actions/map';
import { flyToPin } from '../utils/flyToPin';
import myClasses from '../styles';

const Point = ({
  point,
  filteredDefs,
  setMapParams,
  // eslint-disable-next-line react/prop-types
  styleParam,
}) => {
  const handleClick = () => {
    flyToPin(point.id, filteredDefs, setMapParams);
  };

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      flyToPin(point.id, filteredDefs, setMapParams);
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
        {point.title}
      </h3>
      <p className={myClasses.descStyle}>
        {point.additional_information}
      </p>
    </div>
  );
};
Point.defaultProps = {
  point: {},
  filteredDefs: [],
  setMapParams: null,
};
Point.propTypes = {
  point: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    actual_date: PropTypes.string,
    floor: PropTypes.number,
    storage_place: PropTypes.string,
    accessibility: PropTypes.string,
    language: PropTypes.string,
    informational_plates: PropTypes.bool,
    phone: PropTypes.arrayOf(PropTypes.string),
    additional_information: PropTypes.string,
  }),
  filteredDefs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number),
      }),
      actual_date: PropTypes.string,
      floor: PropTypes.number,
      storage_place: PropTypes.string,
      accessibility: PropTypes.string,
      language: PropTypes.string,
      informational_plates: PropTypes.bool,
      phone: PropTypes.arrayOf(PropTypes.string),
      additional_information: PropTypes.string,
    }),
  ),
  setMapParams: PropTypes.func,
};
const mapStateToProps = (state) => ({
  filteredDefs: defsFilterSelector(state),
});
const mapDispatchToProps = {
  setMapParams: setMap,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Point);
