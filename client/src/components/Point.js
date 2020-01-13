import React from "react";
import myClasses from "../styles";

import { setMap } from '../actions/map';
import { connect } from 'react-redux';
import { flyToPin } from '../utils/flyToPin';
const Point = ({ point, filteredDefs, setMap }) => {
  return (
    <div
      className={myClasses.pointCard}
      onClick={() => flyToPin(point.id, filteredDefs, setMap)}
    >
      <h3 className={myClasses.titleStyle}>
        Title: {point.title}
      </h3>
      <p className={myClasses.descStyle}>
        Description: {point.additional_information}
      </p>
    </div>
  );
};

const mapStateToProps = ({defs, filter}) => ({
  filteredDefs: defs.data
                  .filter(item => item.address.toLowerCase()
						               .includes(filter.toLowerCase())),
});
const mapDispatchToProps = {
  setMap
};
export default connect(mapStateToProps, mapDispatchToProps)(Point);
