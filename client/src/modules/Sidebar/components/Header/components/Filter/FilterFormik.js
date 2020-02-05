import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import FormFormik from './FormFormik';
import FilterHeader from './FilterFormHeader';
import { setFilter, resetFilter } from './actions/filter';
import { fetchDefs } from '../../../ItemList/actions/list';
import FilterSchema from './validator';
import initValues from './initValues';
import { sidebarWidth } from '../../../../styleConstants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: sidebarWidth,
    top: 0,
    width: 320,
    height: '100vh',
    zIndex: 3,
    backgroundColor: 'white',
    boxShadow: '5px 0 10px -2px black'
  }
});

const FilterFormik = ({
  filter,
  setFilterValue,
  resetFilterValue,
  fetchDefItems
}) => {
  const classes = useStyles();
  const filterValues = filter || {};
  const formValues = { ...initValues, ...filterValues };

  const onSubmit = (values, { setSubmitting }) => {
    if (
      filter &&
      Object.keys(values).every(
        key => values[key] === filter[key]
      )
    ) {
      setSubmitting(false);
      return;
    }

    if (Object.values(values).some(value => value)) {
      setFilterValue(values);
      fetchDefItems(values);
    } else if (filter) {
      resetFilterValue();
      fetchDefItems();
    }
    setSubmitting(false);
  };

  return (
    <div className={classes.container}>
      <FilterHeader />
      <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validationSchema={FilterSchema}
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
  setFilterValue: PropTypes.func.isRequired,
  resetFilterValue: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired
};

export default connect(
  state => ({
    filter: state.filter
  }),
  {
    setFilterValue: setFilter,
    resetFilterValue: resetFilter,
    fetchDefItems: params => fetchDefs(params)
  }
)(FilterFormik);
