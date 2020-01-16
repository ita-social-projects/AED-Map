import React from 'react';
import { defsFilterSelector } from '../reducers/defReducer';
import { setMap } from '../actions/map';
import { connect } from 'react-redux';
import { flyToPin } from '../utils/flyToPin';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  pointCard: {
    padding: '20px 10px',
    minHeight: '100px',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff',
    },
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer',
    },
  },
  titleStyle: {
    color: '#fff',
    fontSize: '19px',
    lineHeight: '23px',
    marginBottom: '10px',
  },
  descStyle: {
    color: '#bbb',
    fontSize: '13px',
    lineHeight: '16px',
  },
});

const Point = ({
  point,
  filteredDefs,
  setMap,
  styleParam,
}) => {
  const classes = useStyle();

  return (
    <div
      className={classes.pointCard}
      style={styleParam}
      onClick={() =>
        flyToPin(point.id, filteredDefs, setMap)
      }>
      <h3 className={classes.titleStyle}>{point.title}</h3>
      <p className={classes.descStyle}>
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
