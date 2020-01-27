import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { defsFilterSelector } from '../../../../../../reducers/defReducer';
import { setMap } from '../../../../../../actions/map';

const useStyles = makeStyles({
  pointCard: {
    padding: '20px 10px',
    minHeight: '100px',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff'
    },
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
  setMapParams,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const classes = useStyles();

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
    informational_plates: PropTypes.string,
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
