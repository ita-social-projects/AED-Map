import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { fetchSingleDefById } from '../../../Sidebar/api';
import Loader from '../../../../shared/Loader';
import cancelToken from '../../../../shared/cancel-token';

const currDefCancelToken = cancelToken();

const useStyle = makeStyles({
  list: {
    listStyleType: 'none',
    '& li': {
      borderBottom: '1px solid #000'
    }
  }
});

const DefibrillatorPopupContent = ({ id }) => {
  const classes = useStyle();
  const [currDef, setCurrDef] = useState(null);

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
    <div>
      <ul className={classes.list}>
        <li>{currDef.title}</li>
        <li>{currDef.address}</li>
        <li>{currDef.actual_date}</li>
        <li>{currDef.language}</li>
        <li>{currDef.informational_plates}</li>
      </ul>
    </div>
  ) : (
    <Loader />
  );
};

DefibrillatorPopupContent.propTypes = {
  id: PropTypes.string.isRequired
};

export default DefibrillatorPopupContent;
