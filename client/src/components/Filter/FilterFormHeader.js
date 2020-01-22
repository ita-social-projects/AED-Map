import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 8,
    backgroundColor: '#7986cb',
  },
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
