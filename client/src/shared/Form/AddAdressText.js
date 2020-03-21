import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { connect as connectFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewPoint } from '../../modules/MapHolder/actions/mapState';
import {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
} from '../api';

const AddAdressText = ({
  formik,
  className,
  newPoint,
  addNewPoint
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(formik.values.address);
  useEffect(() => {
    setValue(formik.values.address);
  }, [formik.values.address]);

  const reverseRequest = async () => {
    const result = await getReverseGeocoding(newPoint);
    const {
      lng,
      lat
    } = result.data.results[0].geometry.location;
    formik.setFieldValue(
      'address',
      result.data.results[0].formatted_address
    );
    formik.setFieldValue('coordinates', [lng, lat]);
  };

  useEffect(() => {
    if (Object.keys(newPoint).length !== 0) {
      reverseRequest();
    }
    // eslint-disable-next-line
  }, [newPoint]);

  useEffect(() => {
    return () => {
      addNewPoint({});
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (value.length > 2) {
      (async () => {
        const countries = await getGeocodingOptions(value);
        setOptions(countries.data.predictions);
      })();
    } else {
      setOpen(false);
    }
  }, [value]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const SelectOption = (_, selectedOption) => {
    if (selectedOption != null) {
      formik.setFieldValue(
        'address',
        selectedOption.description
      );
      (async () => {
        const detailsAboutSelectedLocation = await getGeocodingDetails(
          selectedOption.place_id
        );
        const coordinates =
          detailsAboutSelectedLocation.data.result.geometry
            .location;
        formik.setFieldValue('coordinates', [
          coordinates.lng,
          coordinates.lat
        ]);
        addNewPoint({
          lng: coordinates.lng,
          lat: coordinates.lat
        });
      })();
      setValue(selectedOption.description);
      formik.setFieldTouched('address', false);
    }
  };

  return (
    <Autocomplete
      className={className}
      filterOptions={x => x} // for searching
      id="searcher"
      open={open}
      onOpen={() => {
        if (value.length > 0) setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={value}
      onBlur={() => setValue(formik.values.address)}
      onChange={SelectOption}
      getOptionLabel={option => option.description}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          name="address"
          onChange={e => {
            setValue(e.target.value);
          }}
          onBlur={e => {
            formik.setFieldTouched('address', true);
            e.target.value = value;
          }}
          label="Пошук Адреси"
          fullWidth
          helperText={
            formik.errors.address && formik.touched.address
              ? formik.errors.address
              : ''
          }
          error={
            formik.errors.address && formik.touched.address
          }
        />
      )}
    />
  );
};

AddAdressText.propTypes = {
  className: PropTypes.string.isRequired,
  newPoint: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }).isRequired,
  addNewPoint: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.shape({
      address: PropTypes.string
    }),
    errors: PropTypes.shape({
      address: PropTypes.string
    }),
    touched: PropTypes.shape({
      address: PropTypes.bool
    }),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  state => ({
    newPoint: state.newPoint
  }),
  dispatch => ({
    addNewPoint: newPoint => dispatch(addNewPoint(newPoint))
  })
)(connectFormik(AddAdressText));
