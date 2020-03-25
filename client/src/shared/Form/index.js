import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddAdressText from './AddAdressText';
import PlatesSelect from './PlatesSelect';
import AddTelephone from './AddTelephone';
import AddMoreInfo from './AddMoreInfo';
import FormValidation from './validator';
import useAlert from '../Alert/useAlert';
import { MyTextField, MyImageField } from '../Fields';
import {
  setPage,
  setData
} from '../../modules/Sidebar/components/ItemList/actions/list';
import ButtonBack from '../ButtonBack';

const useStyles = makeStyles({
  input: {
    width: '100%',
    marginBottom: 24
  },
  form: {
    backgroundColor: 'white',
    padding: '5%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    borderTop: '1px solid #fff3',
    borderBottom: '1px solid #fff3',
    borderRadius: 5,
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

const MyForm = ({
  INITIAL_VALUES,
  submitAction,
  resetPage,
  resetData
}) => {
  const classes = useStyles();
  const [, ShowAlert] = useAlert();
  const history = useHistory();

  const resetPagination = (page, data) => {
    resetPage(page);
    resetData(data);
  };

  const handleSubmit = async (
    values,
    { resetForm, setErrors }
  ) => {
    const actualDate = new Date()
      .toISOString()
      .split('T')[0];
    try {
      await submitAction({ ...values, actualDate });
      ShowAlert({
        open: true,
        severity: 'success',
        message: 'Додавання пройшло успішно'
      });
      resetForm();
      resetPagination(1, []);
      history.push('/');
    } catch (error) {
      const { errors } = error.response.data;
      setErrors({ ...errors, floor: errors.storage_place });
      ShowAlert({
        open: true,
        severity: 'error',
        message: 'Серверна помилка'
      });
    }
  };

  return (
    <div className={classes.form}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form>
              <AddAdressText className={classes.input} />
              <MyTextField
                name="title"
                label="Введіть назву"
                className={classes.input}
              />
              <MyTextField
                name="accessibility"
                label="Коли доступний пристрій?"
                className={classes.input}
              />
              <MyTextField
                name="storage_place"
                label="Де розташований в будівлі?"
                className={classes.input}
              />
              <MyTextField
                className={classes.input}
                name="floor"
                label="На якому поверсі знаходиться?"
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 20 }
                }}
              />
              <PlatesSelect name="informational_plates" />
              <AddTelephone
                className={classes.input}
                name="phone"
              />
              <MyImageField
                variant="contained" 
                color="primary"
                className={classes.input}
                id="images"
                label="Завантажити зображення"
                name="images"
                setFieldValue={setFieldValue}
              />
              <AddMoreInfo
                className={classes.input}
                name="additional_information"
              />
              <Button
                className={classes.input}
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
                      message:
                        'Дані полів введені некоректно'
                    });
                }}
              >
                Зберегти
              </Button>
              <ButtonBack />
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
    phone: PropTypes.array.isRequired,
    additional_information: PropTypes.string.isRequired,
    storage_place: PropTypes.string.isRequired,
    accessibility: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired
  }).isRequired,
  submitAction: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired
};

export default connect(null, {
  resetPage: page => setPage(page),
  resetData: data => setData(data)
})(MyForm);
