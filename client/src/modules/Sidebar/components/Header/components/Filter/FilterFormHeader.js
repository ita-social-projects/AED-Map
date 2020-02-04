import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    margin: 8,
    backgroundColor: '#7986cb'
  }
}));

const FilterFormHeader = () => {
  const classes = useStyles();

  return (
    <div>
      <Avatar className={classes.avatar}>
        <FilterListIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Filter
      </Typography>
    </div>
  );
};

export default FilterFormHeader;
