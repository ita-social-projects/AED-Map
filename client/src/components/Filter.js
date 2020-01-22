import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../actions/filter';

const Filter = ({ filter, setFilterValue }) => {
  return (
    <div>
      <input
        style={{
          width: '100%',
          marginBottom: '1rem',
          padding: '0.5rem',
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
  setFilterValue: null,
};
Filter.propTypes = {
  filter: PropTypes.string,
  setFilterValue: PropTypes.func,
};
const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilterValue: setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
