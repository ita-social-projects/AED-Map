import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterButton from './FilterButton';
import FilterFormik from './FilterFormik';

const useStyles = makeStyles({
  container: {
    borderLeft: '1px solid grey',
    backgroundColor: 'white'
  }
});

const Filter = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.container}>
      <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <FilterFormik />}
    </div>
  );
};

export default Filter;
