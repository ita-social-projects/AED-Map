import React from 'react';
import { setFilter } from '../actions/filter';
import { connect } from 'react-redux';
import { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        width: '100%',
      },
    },
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    marginTop: '10px'
  },
}));

const Filter = ({ filter, setFilterValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchWrapper}>
      <InputBase
        style={{
          width: 100 + '%',
          padding: 0.5 + 'rem',
        }}
        classes={{
          input: classes.inputInput,
        }}
        type="text"
        placeholder="Впишіть сюди назву вулиці"
        value={filter}
        onChange={(event) => setFilterValue(event.target.value)}
      />

    </div>
  );
};
Filter.defaultProps = {
  filter: '',
  setFilterValue: null
};
Filter.propTypes = {
  filter: PropTypes.string,
  setFilterValue: PropTypes.func
};
const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = {
  setFilterValue: setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
