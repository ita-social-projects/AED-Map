/* eslint-disable camelcase */
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
    paddingTop: '10px',
    marginBottom: '24px',
    borderColor: 'green',
    '& input:valid + fieldset': {
      color: 'red',
      borderWidth: 2
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      borderColor: 'yellow',
      padding: '10px !important'
    },
    '& input:valid:hover + fieldset': {
      borderLeftWidth: 6,
      borderColor: 'yellow',
      padding: '10px !important'
    }
  },
  FormStyle: {
    backgroundColor: 'white',
    padding: '5%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    paddingRight: '5px',
    '&:focus': {
      outline: 'none'
    },
    '&::-webkit-scrollbar': {
      width: '5px'
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

  const handleSubmit = data => {
    const date = new Date();
    const month = date.getMonth();
    // відформатована поточна дата
    const actual_date = `${date.getFullYear()}-${
      month < 10 ? `0${month + 1}` : month + 1
    }-${date.getDate()}`;
    SubmitAction({ ...data, actual_date });
    history.push('/');
  };

  return (
    <div className={classes.FormStyle}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FormValidation}
        onSubmit={data => {
          handleSubmit(data);
        }}
      >
        {({isValid }) => {
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
                startIcon={<SaveIcon />}
                onClick={() => {
                  if (isValid === true)
                    ShowAlert({
                      open: true,
                      severity: 'success',
                      massage: 'Додавання пройшло успішно'
                    });
                  else
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
