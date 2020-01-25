import React from 'react';
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
    boxShadow: '5px 0 10px -2px black'
  }
});

const FilterFormContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FilterHeader />
      <FilterForm />
    </div>
  );
};

export default FilterFormContainer;
