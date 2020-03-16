import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { connect, FieldArray, getIn } from 'formik';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  centered: {
    textAlign: 'center'
  },
  numbersGroup: {
    paddingTop: 10
  },
  title: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '1rem',
    fontFamily:
      '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em'
  }
});

const AddTelephone = ({
  className,
  formik: {
    values: { phone },
    errors,
    touched,
    handleBlur,
    setFieldValue
  }
}) => {
  const classes = useStyles();
  return (
    <div>
      <p className={classes.title}>Ваш номер телефону</p>

      <FieldArray
        name="phone"
        render={arrayHelpers => (
          <div className={classes.numbersGroup}>
            {phone &&
              phone.length > 0 &&
              phone.map((phone, index) => {
                const errorMessage = getIn(
                  errors,
                  `phone[${index}]`
                );
                const isTouched = getIn(
                  touched,
                  `phone[${index}]`
                );
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index}>
                    <MuiPhoneNumber
                      name={`phone[${index}]`}
                      className={className}
                      value={phone}
                      onChange={value =>
                        setFieldValue(
                          `phone[${index}]`,
                          value
                        )
                      }
                      onBlur={handleBlur}
                      defaultCountry="ua"
                      regions="europe"
                      helperText={
                        errorMessage &&
                        isTouched &&
                        errorMessage
                      }
                      error={errorMessage && isTouched}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            onClick={() =>
                              arrayHelpers.remove(index)
                            }
                          >
                            <IconButton
                              color="secondary"
                              aria-label="delete phone"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                );
              })}
            <div className={classes.centered}>
              <IconButton
                color="primary"
                aria-label="add phone"
                onClick={() =>
                  arrayHelpers.insert(phone.length, '')
                }
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        )}
      />
    </div>
  );
};

AddTelephone.propTypes = {
  className: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.shape({
      phone: PropTypes.array.isRequired
    }),
    errors: PropTypes.shape({
      phone: PropTypes.array
    }),
    touched: PropTypes.shape({
      phone: PropTypes.array
    }),
    setFieldValue: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired
  }).isRequired
};

export default connect(AddTelephone);
