import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { connect } from 'formik';
import PropTypes from 'prop-types';
import getGeocodingOptions from '../api';

const AddAdressText = ({ formik, className }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(formik.values.address);
  useEffect(() => {
    setValue(formik.values.address);
  }, [formik.values.address]);

  useEffect(() => {
    let active = true;
    if (value.length > 2) {
      (async () => {
        const countries = await getGeocodingOptions(value);
        if (active) {
          setOptions(
            countries.data.features.map(elem => {
              return elem;
            })
          );
        }
      })();
    } else {
      setOpen(false);
    }
    return () => {
      active = false;
    };
  }, [value]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
      onChange={(e, selectedOption) => {
        if (selectedOption != null) {
          formik.setFieldValue(
            'address',
            selectedOption.place_name
          );
          formik.setFieldValue(
            'coordinates',
            selectedOption.center
          );
          setValue(selectedOption.place_name);
          formik.setFieldTouched('address', false);
        }
      }}
      getOptionLabel={option => option.place_name}
      options={options}
      renderInput={params => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          variant="outlined"
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

export default connect(AddAdressText);
