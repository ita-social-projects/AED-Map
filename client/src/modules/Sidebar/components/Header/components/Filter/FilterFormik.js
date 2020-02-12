import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import FormFormik from './FormFormik';
import FilterHeader from './FilterFormHeader';
import { setFilter, resetFilter } from './actions/filter';
import {
  fetchDefs,
  setPage,
  setData
} from '../../../ItemList/actions/list';
import FilterSchema from './validator';
import INITIAL_VALUES from './consts/initialValues';
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
  fetchDefItems,
  resetData,
  resetPage
}) => {
  const classes = useStyles();
  const initialValues = { ...INITIAL_VALUES, ...filter };

  const onSubmit = async (values, { setSubmitting }) => {
    const resetPagination = (page, data) => {
      resetPage(page);
      resetData(data);
    };

    if (Object.values(values).some(value => value)) {
      resetPagination(1, []);
      setFilterValue(values);
      await fetchDefItems(values);
    } else if (filter) {
      resetFilterValue();
      resetPagination(1, []);
      await fetchDefItems();
    }

    setSubmitting(false);
  };

  return (
    <div className={classes.container}>
      <FilterHeader />
      <Formik
        initialValues={initialValues}
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
  fetchDefItems: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired
};

export default connect(
  state => ({
    filter: state.filter
  }),
  {
    setFilterValue: setFilter,
    resetFilterValue: resetFilter,
    fetchDefItems: params => fetchDefs(params),
    resetPage: page => setPage(page),
    resetData: data => setData(data)
  }
)(FilterFormik);
