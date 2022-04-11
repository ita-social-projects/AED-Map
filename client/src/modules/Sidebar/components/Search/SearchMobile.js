import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { DebounceInput } from 'react-debounce-input';
import { Paper } from '@material-ui/core';
import { INITIAL_VALUES } from './consts';
import { MyInputBase } from '../../../../shared/Fields';
import {
  fetchDefs,
  setPage,
  setData
} from '../ItemList/actions/list';
import { setSearch } from './actions';

const useStyles = makeStyles(() => ({
  searchWrapper: {
    marginBottom: 28,
    marginLeft: 30,
    marginRight: 10,
    width: '90%'
  },
  searchInput: {
    width: '100%',
    paddingRight: '0.5rem',
    paddingLeft: '16px',
    height: 48
  }
}));

const SearchMobile = ({
  setSearch,
  fetchDefItems,
  resetData,
  resetPage,
  search
}) => {
  const classes = useStyles();
  const verifyQuery = /[^A-Za-zА-Яа-я]|\d/;
  const onSearch = ({ target: { value } }) => {
    const resetPagination = (page, data) => {
      resetPage(page);
      resetData(data);
    };

    setSearch({ address: value });

    if (value.length >= 2 || (value.length < 2 && verifyQuery.test(value))) {
      resetPagination(1, []);
      fetchDefItems({ address: value });
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
            id="search"
            placeholder="Введіть адресу"
            name="search"
            className={classes.searchInput}
            autoFocus
            debounceTimeout={300}
            onChange={onSearch}
            value={search.address}
          />
        </Formik>
      </Paper>
    </div>
  );
};

SearchMobile.propTypes = {
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
)(SearchMobile);
