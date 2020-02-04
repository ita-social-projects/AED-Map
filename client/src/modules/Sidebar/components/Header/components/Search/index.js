import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setFilter } from './actions/filter';

const useStyle = makeStyles({
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

// This component is a placeholder
const Search = ({ filter, setFilterValue }) => {
  const classes = useStyle();
  const { address = '' } = filter || {};

  const onChange = ({ value }) => {
    if (filter) {
      setFilterValue({
        ...filter,
        address: value
      });
    } else {
      setFilterValue({ address: value });
    }
  };

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        type="text"
        placeholder="Впишіть сюди назву вулиці"
        value={address}
        onChange={event => onChange(event.target)}
      />
    </div>
  );
};

Search.defaultProps = {
  filter: null
};
Search.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.object]),
  setFilterValue: PropTypes.func.isRequired
};

export default connect(
  state => ({
    filter: state.filter
  }),
  { setFilterValue: setFilter }
)(Search);
