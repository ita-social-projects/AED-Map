import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { DebounceInput } from 'react-debounce-input';
import { Paper } from '@material-ui/core';
import { INITIAL_VALUES } from './consts';
import { MyInputBase } from '../../../../shared/Fields';
import Filter from './components/Filter';
import {
  fetchDefs,
  setPage,
  setData
} from '../ItemList/actions/list';
import { setSearch } from './actions';

const useStyles = makeStyles(() => ({
  searchWrapper: {
    marginBottom: 20
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
  const onSearch = ({ target: { value } }) => {
    const resetPagination = (page, data) => {
      resetPage(page);
      resetData(data);
    };

    setSearch({ address: value });

    if (value.length >= 2) {
      resetPagination(1, []);
      fetchDefItems(search);
    } else if (value.length < 2) {
      setSearch({ address: value });
      resetPagination(1, []);
      fetchDefItems();
    }
  };

  return (
    <div className={classes.searchWrapper}>
      <Paper>
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
            onChange={onSearch}
          />
        </Formik>
      </Paper>
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
