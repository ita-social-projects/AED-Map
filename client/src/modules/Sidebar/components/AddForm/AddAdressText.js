import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { connect } from 'formik';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddAdressText = ({ formik, className }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(formik.values.adress);

  useEffect(() => {
    setValue(formik.values.adress);
  }, [formik.values.adress]);

  useEffect(() => {
    let active = true;
    if (value.length > 2) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1Ijoic2FyYXRlYyIsImEiOiJjazViYjY4eHIxZXNlM2txeGJvY20waHpkIn0.LEO4h63DwhRB458fESisKg` 
        )
        .then(function(response) {
          const countries = response.data;
          if (active) {
            setOptions(
              countries.features.map(elem => {
                return elem;
              })
            );
          }
        })
        .catch(function(error) {
          console.log(`EROR is ${  error}`);
        });
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
      onChange={(e, selectedOption) => {
        if (selectedOption != null) {
          formik.setFieldValue(
            'adress',
            selectedOption.place_name
          );
          formik.setFieldValue(
            'coordinates',
            selectedOption.center
          );
          setValue(selectedOption.place_name);
        }
      }}
      getOptionLabel={option => option.place_name}
      options={options}
      renderInput={params => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          onChange={e => {
            setValue(e.target.value);
          }}
          label="Пошук Адреси"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
};

AddAdressText.propTypes = {
  className: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.shape({
      adress: PropTypes.string
    }),
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default connect(AddAdressText);
