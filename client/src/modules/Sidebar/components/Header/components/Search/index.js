import React from 'react';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { DebounceInput } from 'react-debounce-input';
import { INITIAL_VALUES } from './consts';
import { MyInputBase } from '../../../../../../shared/Fields';
import Filter from '../Filter/index';
import {
  fetchDefs,
  setPage,
  setData
} from '../../../ItemList/actions/list';
import { setSearch } from './actions';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(
        theme.palette.common.white,
        0.25
      )
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  searchInput: {
    width: '100%',
    paddingRight: '0.5rem'
  }
}));

const Search = ({
  search,
  setSearch,
  fetchDefItems,
  resetData,
  resetPage
}) => {
  const classes = useStyles();
  const onSearch = event => {
    setSearch({ address: event.target.value });
    const resetPagination = (page, data) => {
      resetPage(page);
      resetData(data);
    };
    if (event.target.value.length > 2) {
      resetPagination(1, []);
      fetchDefItems(search);
    } else if (event.target.value.length < 2) {
      setSearch({ address: event.target.value });
      resetPagination(1, []);
      fetchDefItems();
    }
  };

  return (
    <div className={classes.searchWrapper}>
      <Formik initialValues={INITIAL_VALUES}>
        <DebounceInput
          element={MyInputBase}
          startAdornment={<Filter />}
          id="search"
          placeholder="Впишіть сюди адресу"
          name="search"
          className={classes.searchInput}
          autoFocus
          debounceTimeout={300}
          onChange={event => onSearch(event)}
        />
      </Formik>
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired,
  setSearch: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired
};
export default connect(
  state => ({ search: state.search }),
  {
    setSearch: value => setSearch(value),
    fetchDefItems: params => fetchDefs(params),
    resetPage: page => setPage(page),
    resetData: data => setData(data)
  }
)(Search);
