import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { createDefPoint } from '../ItemList/actions/list';
import AddAdressText from './AddAdressText';
import PlatesSelect from './PlatesSelect';
import AddTelephone from './AddTelephone';
import AddMoreInfo from './AddMoreInfo';
import AddItRedux from './AddItRedux';
import AddInDB from './AddInDB';

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
      padding: '10px !important' // override inline-style
    },
    '& input:valid:hover + fieldset': {
      borderLeftWidth: 6,
      borderColor: 'yellow',
      padding: '10px !important' // override inline-style
    }
  },
  FormStyle: {
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

const MyForm = ({ createDef }) => {
  const classes = useStyles();

  return (
    <div className={classes.FormStyle}>
      <Formik
        initialValues={{
          title: '',
          adress: '',
          floor: 0,
          informational_plates: 'PRESENT',
          phone: '',
          additional_information: '',
          location: '',
          accessibility: '',
          coordinates: [] //  [Longitude,Latitude]
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          const date = new Date();
          const month = date.getMonth();
          // eslint-disable-next-line camelcase
          const actual_date = `${date.getFullYear()}-${
            month < 10 ? `0${month + 1}` : month + 1
          }-${date.getDate()}`; // відформатована поточна дата
          AddItRedux({ ...data, actual_date }, createDef);
          AddInDB({ ...data, actual_date });
          setSubmitting(false);
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <AddAdressText
                className={classes.DefaultStyle}
              />
              <TextField
                name="title"
                value={values.title}
                label="Введіть назву"
                className={classes.DefaultStyle}
                onChange={handleChange}
              />
              <TextField
                name="accessibility"
                label="Коли доступний пристрій?"
                className={classes.DefaultStyle}
                value={values.accessibility}
                onChange={handleChange}
              />
              <TextField
                name="location"
                label="Де розташований в будівлі?"
                className={classes.DefaultStyle}
                value={values.location}
                onChange={handleChange}
              />
              <TextField
                className={classes.DefaultStyle}
                onChange={handleChange}
                value={
                  values.floor === 0 ? '' : values.floor
                }
                name="floor"
                label="На якому поверсі знаходиться?"
                type="number"
                min="0"
                max="10"
                step="1"
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
  createDef: PropTypes.func.isRequired
};

export default connect(null, { createDef: createDefPoint })(
  MyForm
);
