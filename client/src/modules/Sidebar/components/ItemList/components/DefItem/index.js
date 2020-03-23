import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { NavLink, Link } from 'react-router-dom';
import permissionService from '../../../../../Auth/permissionService';

import {
  setMapCenter,
  setMapZoom
} from '../../../../../MapHolder/actions/mapState';
import DeleteBtn from './DeleteBtn';
import ConfirmationModalWrapper from '../../../../../../shared/ConfirmationModalWrapper';
import {
  deleteDefItem,
  setActive
} from '../../actions/list';
import {
  ENTER_BUTTON_CODE,
  BASE_ZOOM_VALUE,
  EDIT_DEF_POINT,
  DELETE_DEF_POINT
} from '../../consts';

const useStyles = makeStyles({
  pointCard: {
    minHeight: 100,
    display: 'flex',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff',
      padding: 0
    },
    textDecoration: 'none',
    background: isActive =>
      isActive ? '#344870' : '#282c34',
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer',
      '& div:last-child': {
        visibility: 'visible',
        '& button': {
          '&:hover': {
            '& span': {
              background: '#dadada'
            }
          }
        }
      }
    }
  },
  pointCardInfo: {
    flex: '5',
    padding: '15px 10px',
    outline: 'none'
  },
  pointCardButtons: {
    visibility: 'hidden',
    height: '100%',
    flex: '1',

    '& button': {
      opacity: '.7',
      cursor: 'pointer',
      height: '50%',
      width: '100%',
      backgroundColor: '#3E424A',
      justifyContent: 'center',

      border: 'none',
      '& span': {
        display: 'block',
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 30,
        width: 30,
        justifyContent: 'center',
        paddingTop: 3
      }
    }
  },
  titleStyle: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 10
  },
  descStyle: {
    color: '#bbb',
    fontSize: 13
  }
});
const DefItem = ({
  makeItemActive,
  activeItemId,
  defItemInfo,
  setMapCenterCoords,
  setMapZoomParam,
  // eslint-disable-next-line react/prop-types
  styleParam,
  deleteDefibrPoint,
  user,
  mapData
}) => {
  const isActive = defItemInfo._id === activeItemId;
  const classes = useStyles(isActive);
  const [lng, lat] = defItemInfo.location.coordinates;
  const [
    permissionForEdit,
    changePermissionForEdit
  ] = useState(false);
  const [
    permissionForDelete,
    changePermissionForDelete
  ] = useState(false);

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

  useEffect(() => {
    const coords = mapData.find(
      def => def._id === activeItemId
    );
    if (coords) {
      const [lng, lat] = coords.location.coordinates;
      setMapCenterCoords({
        lng,
        lat
      });
      setMapZoomParam(BASE_ZOOM_VALUE);
    }

    const permissionEdit = permissionService(
      EDIT_DEF_POINT,
      user,
      defItemInfo
    );
    const permissionDelete = permissionService(
      DELETE_DEF_POINT,
      user,
      defItemInfo
    );
    changePermissionForEdit(permissionEdit);
    changePermissionForDelete(permissionDelete);
    // eslint-disable-next-line
  }, [user, defItemInfo]);

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
          {defItemInfo.title}
        </h3>
        <p className={classes.descStyle}>
          {defItemInfo.address}
        </p>
      </div>
      <div className={classes.pointCardButtons}>
        <Link to="/edit-form">
          {permissionForEdit && (
            <button type="button">
              <span>
                <EditIcon />
              </span>
            </button>
          )}
        </Link>
        {permissionForDelete && (
          <ConfirmationModalWrapper
            ButtonOpen={DeleteBtn}
            confirmHandle={() =>
              deleteDefibrPoint(defItemInfo._id)
            }
            message="Видалити мітку?"
          />
        )}
      </div>
    </NavLink>
  );
};

DefItem.defaultProps = {
  defItemInfo: {},
  mapData: [],
  activeItemId: () => null,
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null,
  deleteDefibrPoint: () => null,
  user: null
};

DefItem.propTypes = {
  defItemInfo: PropTypes.shape({
    _id: PropTypes.string,
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
  mapData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })
    })
  ),
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func,
  deleteDefibrPoint: PropTypes.func,
  activeItemId: PropTypes.string,
  makeItemActive: PropTypes.func.isRequired
};

export default connect(
  state => ({
    user: state.user.user,
    activeItemId: state.defs.active,
    mapData: state.defs.mapData
  }),
  dispatch => ({
    makeItemActive: itemId => dispatch(setActive(itemId)),
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState)),
    deleteDefibrPoint: id => dispatch(deleteDefItem(id))
  })
)(DefItem);
