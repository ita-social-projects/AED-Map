import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  setMapCenter,
  setMapZoom
} from '../../../../../MapHolder/actions/mapState';
import { setActive } from '../../actions/list';
import {
  ENTER_BUTTON_CODE,
  BASE_ZOOM_VALUE
} from '../../consts';

const useStyles = makeStyles({
  pointCard: {
    color: 'rgba(36, 36, 36, 1)',
    textDecoration: 'none',
    background: 'rgba(197, 197, 197, 0.71)',
    height: '50px',
    overflow: 'hidden',
    '&:hover': {
      background: 'rgba(145,155,150,0.8)',
      cursor: 'pointer'
    }
  },
  pointCardInfo: {
    height: '50px',
    paddingLeft: 16,
    paddingTop: 8,
    outline: 'none',
    borderBottom: '1px solid rgba(178, 178, 178, 1)'
  },
  titleStyle: {
    fontSize: 13,
    textOverflow: 'ellipsis',
    '&::-ms-text-overflow': 'ellipsis',
    '&::-o-text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%'
  },
  descStyle: {
    fontSize: 10,
    textOverflow: 'ellipsis',
    '&::-ms-text-overflow': 'ellipsis',
    '&::-o-text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%'
  }
});
const DefItemMobile = ({
  makeItemActive,
  defItemInfo,
  setMapCenterCoords,
  setMapZoomParam,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const classes = useStyles();
  const [lng, lat] = defItemInfo.location.coordinates;

  const handleClick = () => {
    makeItemActive(defItemInfo._id);
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
    <NavLink
      to={`?id=${defItemInfo._id}`}
      className={classes.pointCard}
      style={styleParam}
    >
      <div
        className={classes.pointCardInfo}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <h3 className={classes.titleStyle}>
          {defItemInfo.address}
        </h3>
        <p className={classes.descStyle}>
          {defItemInfo.title}
          {defItemInfo.address}
        </p>
      </div>
    </NavLink>
  );
};

DefItemMobile.defaultProps = {
  defItemInfo: {},
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null
};

DefItemMobile.propTypes = {
  defItemInfo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    })
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func,
  makeItemActive: PropTypes.func.isRequired
};

export default connect(
  state => ({
    mapData: state.defs.mapData
  }),
  dispatch => ({
    makeItemActive: itemId => dispatch(setActive(itemId)),
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState))
  })
)(DefItemMobile);
