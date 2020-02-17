import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'formik';
import PropTypes from 'prop-types';

const AddMoreInfo = ({ className, formik }) => {
  return (
    <div>
      <TextField
        label="Додаткова інформація..."
        multiline
        rows="4"
        className={className}
        variant="filled"
        value={formik.values.additional_information}
        onChange={(e) => {
          formik.setFieldValue(
            'additional_information',
            e.target.value
          );
        }}
      />
    </div>
  );
};

AddMoreInfo.propTypes = {
  className: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.shape({
      additional_information: PropTypes.string
    }),
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default connect(AddMoreInfo);
