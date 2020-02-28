import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { defsSearchSelector } from '../../reducers/listReducer';
import { setMapCenter } from '../../../../../MapHolder/actions/mapState';
import {
  deleteDefPoint,
  editDefPoint
} from '../../actions/list';
import DeleteBtn from './DeleteBtn';
import ModalContent from './ModalContent';
import ModalWrapper from '../../../../../../shared/ModalWrapper';

const useStyles = makeStyles({
  pointCard: {
    minHeight: '100px',
    display: 'flex',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff',
      padding: '0px'
    },
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer',
      '& div:last-child': {
        visibility: 'visible '
      }
    }
  },
  pointCardInfo: {
    flex: '5',
    padding: '20px 10px'
  },
  pointCardButtons: {
    visibility: 'hidden',
    flex: '1',
    '& button': {
      border: '2px solid #000',
      width: '100%',
      height: '50%',
      backgroundColor: '#fff',
      opacity: '.7',
      transform: 'scale(0.8)',
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
  setMapParams,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const classes = useStyles();

  const handleClick = () => {
    const [lng, lat] = defItemInfo.location.coordinates;
    const mapParams = {
      lng,
      lat
    };
    setMapParams(mapParams);
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      const [lng, lat] = defItemInfo.location.coordinates;
      const mapParams = {
        lng,
        lat
      };
      setMapParams(mapParams);
    }
  };
  return (
    <div
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
        <button type="button">
          <EditIcon />
        </button>
        <ModalWrapper
          ButtonOpen={DeleteBtn}
          ModalContent={params => (
            <ModalContent
              {...params}
              /* eslint-disable */
              id={defItemInfo._id}
              /* eslint-enable */
            />
          )}
        />
      </div>
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
    informational_plates: PropTypes.string,
    phone: PropTypes.arrayOf(PropTypes.string),
    additional_information: PropTypes.string
  }),
  setMapParams: PropTypes.func
};

export default connect(
  state => ({
    filteredDefs: defsSearchSelector(state)
  }),
  dispatch => ({
    setMapParams: mapState =>
      dispatch(setMapCenter(mapState)),
    deleteDefibrPoint: id => dispatch(deleteDefPoint(id)),
    editDefibrPoint: (id, ...data) =>
      dispatch(editDefPoint(id, ...data))
  })
)(DefItem);
