import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: `${theme.spacing(1)}px auto`,
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
        Фільтр
      </Typography>
    </div>
  );
};

export default FilterFormHeader;
