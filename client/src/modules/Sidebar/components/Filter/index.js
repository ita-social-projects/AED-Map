import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import FilterButton from './FilterButton';
import FilterFormContainer from './FilterFormContainer';

const useStyles = createUseStyles({
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
      {isOpen ? <FilterFormContainer /> : null}
    </div>
  );
};

export default Filter;
