import React from 'react';
import myClasses from '../styles';

import { defsFilterSelector } from '../reducers/defReducer';
import { setMap } from '../actions/map';
import { connect } from 'react-redux';
import { flyToPin } from '../utils/flyToPin';

const Point = ({
  point,
  filteredDefs,
  setMap,
  styleParam,
}) => {
  return (
    <div
      className={myClasses.pointCard}
      style={styleParam}
      onClick={() =>
        flyToPin(point.id, filteredDefs, setMap)
      }>
      <h3 className={myClasses.titleStyle}>
        {point.title}
      </h3>
      <p className={myClasses.descStyle}>
        {point.additional_information}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filteredDefs: defsFilterSelector(state),
});
const mapDispatchToProps = {
  setMap,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Point);
