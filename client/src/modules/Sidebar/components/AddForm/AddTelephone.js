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
        className={className}
        value={formik.values.phone}
        onChange={value =>
          formik.setFieldValue('phone', value)
        }
        defaultCountry="ua"
        regions="europe"
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
    setFieldValue: PropTypes.func.isRequired
  }).isRequired
};

export default connect(AddTelephone);
