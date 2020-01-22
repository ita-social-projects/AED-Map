import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import FilterForm from './FilterForm';
import FilterHeader from './FilterFormHeader';

const useStyles = createUseStyles({
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
    boxShadow: '5px 0 10px -2px black',
  },
});

const FilterFormContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FilterHeader />
      <FilterForm {...props} />
    </div>
  );
};

FilterFormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setIsFilter: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterFormContainer;
