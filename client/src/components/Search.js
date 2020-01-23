import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { setFilter } from '../actions/filter';

const useStyle = createUseStyles({
  container: {
    flex: 1
  },
  search: {
    width: '100%',
    height: '100%',
    marginBottom: '1rem',
    padding: '0.5rem',
    border: 'none',
    outline: 'none'
  }
});

const Search = ({ filter, setFilterValue }) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        type="text"
        placeholder="Впишіть сюди назву вулиці"
        value={filter.address}
        onChange={(event) =>
          setFilterValue({
            ...filter,
            address: event.target.value
          })
        }
      />
    </div>
  );
};
Search.defaultProps = {
  filter: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.string,
    language: PropTypes.string
  }),
  setFilterValue: null
};
Search.propTypes = {
  filter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  setFilterValue: PropTypes.func
};
const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = {
  setFilterValue: setFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
