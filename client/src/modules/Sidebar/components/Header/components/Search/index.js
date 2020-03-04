import React from 'react';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Formik} from 'formik';
import {DebounceInput} from 'react-debounce-input';
import { setSearch } from './actions';
import { INITIAL_VALUES } from './consts';
import { MyInputBase } from '../../../../../../shared/Fields';
import Filter from '../Filter/index';
import {
  fetchDefs,
  setPage,
  setData,
} from '../../../ItemList/actions/list';

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
    padding: '0.5rem',
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
  inputOuter: {
    width: '100%',
    padding: '0.5rem',
  },
}));

// eslint-disable-next-line no-unused-vars
const Search = ({ fetchDefItems,resetData, resetPage }) => {

  const classes = useStyles();
  const onSearch = async (event) => {
    
    const resetPagination = (page, data) => {
      resetPage(page);
      resetData(data);
    };

    const values = {
      address: event.target.value,
    };    

    if (Object.values(values).some(value => value)) {
      resetPagination(1, []);
      await fetchDefItems(values);
    }else if (values) {
      resetPagination(1, []);
      await fetchDefItems();
    }
  };

  return (
    <div className={classes.searchWrapper}>
      <Formik
        initialValues={INITIAL_VALUES}
      >
        <DebounceInput
          element={MyInputBase}
          startAdornment={<Filter />}
          id="filter"
          placeholder="Впишіть сюди назву вулиці"
          name="filter"
          className={classes.inputOuter}
          classes={{
            input: classes.inputInput,
          }}
          autoFocus
          onChange={(event)=>onSearch(event)}
          minLength={2}
          debounceTimeout={300}
        />
                
      </Formik>
    </div>
  );
};

Search.propTypes = {
  fetchDefItems: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
};
export default connect(
  state => ({
    search: state.search
  }),
  {
    setSearchValue: setSearch,
    fetchDefItems: params => fetchDefs(params),
    resetPage: page => setPage(page),
    resetData: data => setData(data)
  }
)(Search);
