import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Form from './Form';
import { setFilter } from '../../../../actions/filter';

const FilterForm = ({ filter, setFilterValue }) => {
  const { title = '', address = '', language = '' } =
    filter || {};

  const onSubmit = values => {
    const newFilter = {};

    // Set only filled filters
    Object.keys(values).forEach(key => {
      if (values[key]) {
        newFilter[key] = values[key];
      }
    });

    if (Object.keys(newFilter).length) {
      setFilterValue(newFilter);
    } else {
      setFilterValue(null);
    }
  };

  return (
    <Formik
      initialValues={{ title, address, language }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleReset
      }) => (
        <Form
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
      )}
    </Formik>
  );
};

FilterForm.defaultProps = {
  filter: null
};
FilterForm.propTypes = {
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
)(FilterForm);
