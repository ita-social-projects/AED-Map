import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { fetchSingleDefById } from '../../../Sidebar/api';
import Loader from '../../../../shared/Loader';
import cancelToken from '../../../../shared/cancel-token';
import { titles } from './consts';

const currDefCancelToken = cancelToken();

const useStyle = makeStyles({
  popupContainer: {
    maxWidth: 400,
    maxHeight: 270,
    padding: '5px 15px',
    overflowY: 'auto',
    color: 'white',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    },
    '& p': {
      marginBottom: 5
    }
  },
  title: {
    color: '#bbb',
    fontWeight: 'bold'
  }
});

const DefibrillatorPopupContent = ({ id }) => {
  const classes = useStyle();
  const [currDef, setCurrDef] = useState(null);

  const formatData = (key, def) => {
    if (key === 'actual_date') {
      return new Date(def[key]).toLocaleDateString(
        'uk-UA',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
      );
    }

    if (key === 'phone') {
      return def[key].join(', ');
    }

    return def[key];
  };

  useEffect(() => {
    const fetchData = async () => {
      setCurrDef(null);
      const res = await fetchSingleDefById(id);
      const { defibrillator } = res.data;
      setCurrDef(defibrillator);
    };

    fetchData();

    return () => {
      currDefCancelToken.cancel();
    };
  }, [id]);

  return currDef ? (
    <div className={classes.popupContainer}>
      {Object.keys(titles).map(
        key =>
          currDef[key] && (
            <p key={key}>
              <span className={classes.title}>
                {titles[key]}
              </span>
              <br />
              {formatData(key, currDef)}
            </p>
          )
      )}
    </div>
  ) : (
    <Loader />
  );
};

DefibrillatorPopupContent.propTypes = {
  id: PropTypes.string.isRequired
};

export default DefibrillatorPopupContent;
