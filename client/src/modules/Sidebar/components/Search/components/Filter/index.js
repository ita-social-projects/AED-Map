import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import FilterButton from './FilterButton';
import FilterFormik from './FilterFormik';

const useStyles = makeStyles({
  filterFadeTransitionEnter: {
    opacity: 0,
    transform: 'translateX(-150px)'
  },
  filterFadeTransitionEnterActive: {
    opacity: 1,
    transform: 'translateX(0)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  },
  filterFadeTransitionExit: {
    opacity: 1
  },
  filterFadeTransitionExitActive: {
    opacity: 0,
    transform: 'translateX(-150px)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  }
});
const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const transitionClasses = {
    enter: classes.filterFadeTransitionEnter,
    enterActive: classes.filterFadeTransitionEnterActive,
    exit: classes.filterFadeTransitionExit,
    exitActive: classes.filterFadeTransitionExitActive
  };

  return (
    <div>
      <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <CSSTransition
        in={isOpen}
        classNames={transitionClasses}
        timeout={1000}
        unmountOnExit
      >
        <FilterFormik setIsOpen={setIsOpen} />
      </CSSTransition>
    </div>
  );
};

export default Filter;
