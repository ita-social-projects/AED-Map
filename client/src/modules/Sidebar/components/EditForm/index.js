/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyForm from '../../../../shared/Form';
import { editItem, fetchSingleDefById } from '../../api';
import Loader from '../../../../shared/Loader';
import cancelToken from '../../../../shared/cancel-token';
import { setMapCenter } from '../../../MapHolder/actions/mapState';
import { getReverseGeocoding } from '../../../../shared/api';

const defCancelToken = cancelToken();

const useStyles = makeStyles({
  loader: {
    padding: '44%'
  }
});

const EditForm = ({ setMapCenter }) => {
  const [def, setDef] = useState(null);

  const classes = useStyles();
  const { href } = window.location;
  const id = href.slice(href.lastIndexOf('/') + 1);

  const prepareData = async ({
    data: { defibrillator }
  }) => {
    const [lng, lat] = defibrillator.location.coordinates;
    const correctAddress = await getReverseGeocoding({
      lng,
      lat
    });

    setDef({
      title: defibrillator.title,
      address:
        correctAddress.data.results[0].formatted_address,
      informational_plates:
        defibrillator.informational_plates,
      phone: defibrillator.phone,
      language: defibrillator.language,
      additional_information:
        defibrillator.additional_information,
      floor: defibrillator.storage_place.match(/\d/)[0],
      storage_place: defibrillator.storage_place.match(
        /, (.*)/
      )[1],
      coordinates: defibrillator.location.coordinates,
      accessibility: defibrillator.accessibility
    });
    setMapCenter({ lng, lat, zoom: 17 });
  };

  useEffect(() => {
    (async () => {
      setDef(null);

      const res = await fetchSingleDefById(id);

      prepareData(res);
    })();

    return () => {
      defCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  const hadleSubmit = async ({ images, ...data }) => {
    const body = {
      ...data,
      _id: id,
      actual_date: data.actualDate,
      location: {
        type: 'Point',
        coordinates: data.coordinates
      },
      storage_place: `Поверх ${data.floor}, ${data.storage_place}`
    };

    await editItem(body);
  };

  return def ? (
    <MyForm
      INITIAL_VALUES={def}
      submitAction={hadleSubmit}
    />
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
};

EditForm.propTypes = {
  setMapCenter: PropTypes.func.isRequired
};
export default connect(null, dispatch => ({
  setMapCenter: newPoint => dispatch(setMapCenter(newPoint))
}))(EditForm);
