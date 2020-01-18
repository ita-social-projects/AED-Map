import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions/filter';

const Filter = ({ filter, setFilter }) => {
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
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
