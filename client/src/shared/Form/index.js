import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import AddAdressText from './AddAdressText';
import PlatesSelect from './PlatesSelect';
import AddTelephone from './AddTelephone';
import AddMoreInfo from './AddMoreInfo';
import FormValidation from './validator';
import useAlert from '../Alert/useAlert';
import { MyTextField } from '../Fields';

const useStyles = makeStyles({
  DefaultStyle: {
    width: '100%',
    marginBottom: 24
  },
  FormStyle: {
    backgroundColor: 'white',
    padding: '5%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    '&:focus': {
      outline: 'none'
    },
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    }
  }
});

const MyForm = ({ INITIAL_VALUES, SubmitAction }) => {
  const classes = useStyles();
  const [, ShowAlert] = useAlert();
  const history = useHistory();

  const handleSubmit = async (
    values,
    { resetForm, setErrors }
  ) => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    // відформатована поточна дата
    const actualDate = `${date.getFullYear()}-${
      month < 10 ? `0${month + 1}` : month + 1
    }-${day < 10 ? `0${day + 1}` : day + 1}`;
    try {
      await SubmitAction({ ...values, actualDate });
      resetForm();
      ShowAlert({
        open: true,
        severity: 'success',
        massage: 'Додавання пройшло успішно'
      });
      history.push('/');
    } catch (error) {
      const {errors} = error.response.data;
      setErrors({ ...errors, floor: errors.storage_place });
      ShowAlert({
        open: true,
        severity: 'error',
        massage: 'Дані полів введені некоректно'
      });
    }
  };

  return (
    <div className={classes.FormStyle}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form>
              <AddAdressText
                className={classes.DefaultStyle}
              />
              <MyTextField
                name="title"
                label="Введіть назву"
                className={classes.DefaultStyle}
              />
              <MyTextField
                name="accessibility"
                label="Коли доступний пристрій?"
                className={classes.DefaultStyle}
              />
              <MyTextField
                name="storage_place"
                label="Де розташований в будівлі?"
                className={classes.DefaultStyle}
              />
              <MyTextField
                className={classes.DefaultStyle}
                name="floor"
                label="На якому поверсі знаходиться?"
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 20 }
                }}
              />
              <PlatesSelect name="informational_plates" />
              <AddTelephone
                className={classes.DefaultStyle}
                name="phone"
              />
              <AddMoreInfo
                className={classes.DefaultStyle}
                name="additional_information"
              />
              <Button
                className={classes.DefaultStyle}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                endIcon={<SaveIcon />}
                onClick={() => {
                  if (isValid === false)
                    ShowAlert({
                      open: true,
                      severity: 'error',
                      massage:
                        'Дані полів введені некоректно'
                    });
                }}
              >
                Зберегти
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

MyForm.propTypes = {
  INITIAL_VALUES: PropTypes.shape({
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
    informational_plates: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    additional_information: PropTypes.string.isRequired,
    storage_place: PropTypes.string.isRequired,
    accessibility: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired
  }).isRequired,
  SubmitAction: PropTypes.func.isRequired
};

export default MyForm;
