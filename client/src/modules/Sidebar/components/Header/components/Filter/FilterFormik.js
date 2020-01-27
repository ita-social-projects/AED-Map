import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import FormFormik from './FormFormik';
import FilterHeader from './FilterFormHeader';
import { setFilter } from '../../../../../../actions/filter';
import AuthSchema from './validator';
import initValues from './initValues';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: 360,
    top: 0,
    width: 320,
    height: '100vh',
    zIndex: 3,
    backgroundColor: 'white',
    boxShadow: '5px 0 10px -2px black'
  }
});

const FilterFormik = ({ filter, setFilterValue }) => {
  const classes = useStyles();
  const filterValues = filter || {};
  const formValues = { ...initValues, ...filterValues };

  const onSubmit = (values, { setSubmitting }) => {
    if (Object.values(values).some(value => value)) {
      setFilterValue(values);
    } else {
      setFilterValue(null);
    }
    setSubmitting(false);
  };

  return (
    <div className={classes.container}>
      <FilterHeader />
      <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validationSchema={AuthSchema}
        enableReinitialize
      >
        {formik => (
          <FormFormik onSubmit={formik.handleSubmit} />
        )}
      </Formik>
    </div>
  );
};

FilterFormik.defaultProps = {
  filter: null
};
FilterFormik.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.object]),
  setFilterValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filter: state.filter
});
const mapDispatchToProps = {
  setFilterValue: setFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterFormik);
