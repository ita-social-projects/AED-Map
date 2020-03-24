import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import permissionService from '../../../../../Auth/permissionService';
import {
  setMapCenter,
  setMapZoom
} from '../../../../../MapHolder/actions/mapState';
import DeleteBtn from './DeleteBtn';
import BlockBtn from './BlockBtn';
import ConfirmationModalWrapper from '../../../../../../shared/ConfirmationModalWrapper';
import {
  deleteDefItem,
  blockDefItem,
  setActive
} from '../../actions/list';
import {
  ENTER_BUTTON_CODE,
  BASE_ZOOM_VALUE,
  EDIT_DEF_POINT,
  DELETE_DEF_POINT,
  BLOCK_DEF_POINT
} from '../../consts';

const useStyles = makeStyles({
  pointCard: {
    minHeight: 100,
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff',
      padding: 0
    },
    textDecoration: 'none',
    background: props =>
      props.isActive ? '#344870' : '#282c34',
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer'
    }
  },
  pointCardInfo: {
    padding: 15,
    outline: 'none'
  },
  pointCardButtons: {
    padding: props => (props.hasPermission ? 15 : 0),

    display: 'flex',
    height: props => (props.hasPermission ? 60 : 0),

    '& a': {
      textDecoration: 'none'
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
  blockDefibrPoint,
  user
}) => {
  const isActive = defItemInfo._id === activeItemId;
  const hasPermission =
    user &&
    (user.role === 'Admin' ||
      user._id === defItemInfo.owner);
  const classes = useStyles({ isActive, hasPermission });
  const [lng, lat] = defItemInfo.location.coordinates;
  const [
    permissionForEdit,
    changePermissionForEdit
  ] = useState(false);
  const [
    permissionForDelete,
    changePermissionForDelete
  ] = useState(false);
  const [
    permissionForBlockDef,
    changePermissionForBlockDef
  ] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    makeItemActive(defItemInfo._id);
    setMapCenterCoords({
      lng,
      lat
    });
    setMapZoomParam(BASE_ZOOM_VALUE);
  };

  const handleEditClick = event => {
    event.preventDefault();
    history.push(`/edit-form/${defItemInfo._id}`);
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
    const permissionBlockDef = permissionService(
      BLOCK_DEF_POINT,
      user
    );
    changePermissionForEdit(permissionEdit);
    changePermissionForDelete(permissionDelete);
    changePermissionForBlockDef(permissionBlockDef);
    // eslint-disable-next-line
  }, [user]);

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
        {permissionForEdit && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEditClick}
          >
            Редагувати
          </Button>
        )}
        {permissionForDelete && (
          <ConfirmationModalWrapper
            ButtonOpen={DeleteBtn}
            confirmHandle={() =>
              deleteDefibrPoint(defItemInfo._id)
            }
            message="Видалити дефібрилятор?"
            messageAlert="Дефібрилятор успішно видалено"
          />
        )}
        {permissionForBlockDef && (
          <ConfirmationModalWrapper
            ButtonOpen={({ handleOpen }) => (
              <BlockBtn
                handleOpen={handleOpen}
                blocked={defItemInfo.blocked}
              />
            )}
            confirmHandle={() =>
              blockDefibrPoint(
                defItemInfo._id,
                !defItemInfo.blocked
              )
            }
            message={
              defItemInfo.blocked
                ? 'Розблокувати дефібрилятор?'
                : 'Заблокувати дефібрилятор?'
            }
            messageAlert={
              defItemInfo.blocked
                ? 'Дефібрилятор розблоковано'
                : 'Дефібрилятор заблоковано'
            }
          />
        )}
      </div>
    </NavLink>
  );
};

DefItem.defaultProps = {
  defItemInfo: {},
  activeItemId: () => null,
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null,
  deleteDefibrPoint: () => null,
  blockDefibrPoint: () => null,
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
    additional_information: PropTypes.string,
    blocked: PropTypes.bool,
    owner: PropTypes.string
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func,
  deleteDefibrPoint: PropTypes.func,
  blockDefibrPoint: PropTypes.func,
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
    deleteDefibrPoint: id => dispatch(deleteDefItem(id)),
    blockDefibrPoint: (id, blocked) =>
      dispatch(blockDefItem(id, blocked))
  })
)(DefItem);
