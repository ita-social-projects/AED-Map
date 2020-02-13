import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { defsSearchSelector } from '../../reducers/listReducer';
import {
  setMapCenter,
  setMapZoom
} from '../../../../../MapHolder/actions/mapState';
import {
  ENTER_BUTTON_CODE,
  BASE_ZOOM_VALUE
} from '../../consts';

const useStyles = makeStyles({
  pointCard: {
    padding: '20px 10px',
    minHeight: '100px',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff'
    },
    background: '#282c34',
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer'
    }
  },
  titleStyle: {
    color: '#fff',
    fontSize: '19px',
    lineHeight: '23px',
    marginBottom: '10px'
  },
  descStyle: {
    color: '#bbb',
    fontSize: '13px',
    lineHeight: '16px'
  }
});

const DefItem = ({
  defItemInfo,
  setMapCenterCoords,
  setMapZoomParam,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const classes = useStyles();
  const [lng, lat] = defItemInfo.location.coordinates;

  const handleClick = () => {
    setMapCenterCoords({
      lng,
      lat
    });
    setMapZoomParam(BASE_ZOOM_VALUE);
  };

  const handleKeyDown = event => {
    if (event.keyCode === ENTER_BUTTON_CODE) {
      setMapCenterCoords({
        lng,
        lat
      });
    }
  };

  return (
    <div
      className={classes.pointCard}
      style={styleParam}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <h3 className={classes.titleStyle}>
        {defItemInfo.title}
      </h3>
      <p className={classes.descStyle}>
        {defItemInfo.address}
      </p>
    </div>
  );
};
DefItem.defaultProps = {
  defItemInfo: {},
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null
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
    informational_plates: PropTypes.string,
    phone: PropTypes.arrayOf(PropTypes.string),
    additional_information: PropTypes.string
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func
};

export default connect(
  state => ({
    filteredDefs: defsSearchSelector(state)
  }),
  dispatch => ({
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState))
  })
)(DefItem);
