import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { connect } from 'formik';
import PropTypes from 'prop-types';

const AddTelephone = ({ className, formik }) => {
  const mystyle = {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0',
    fontSize: '1rem',
    fontFamily:
      '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em'
  };
  return (
    <div>
      <p style={mystyle}>Ваш номер телефону</p>
      <MuiPhoneNumber
        name='phone'
        className={className}
        value={formik.values.phone}
        onChange={value =>
          formik.setFieldValue('phone', value)
        }
        onBlur={formik.handleBlur}
        defaultCountry="ua"
        regions="europe"
        helperText={
          formik.errors.phone &&
          formik.touched.phone &&
          formik.errors.phone
        }
        error={formik.errors.phone && formik.touched.phone}
      />
    </div>
  );
};

AddTelephone.propTypes = {
  className: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.shape({
      phone: PropTypes.string
    }),
    errors: PropTypes.shape({
      phone: PropTypes.string
    }),
    touched: PropTypes.shape({
      phone: PropTypes.bool
    }),
    setFieldValue: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired
  }).isRequired
};

export default connect(AddTelephone);
