import React from "react";

import { setFilter } from '../actions/filter';
import { connect } from 'react-redux';

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <input style={{width: 100 + '%', marginBottom: 1 + 'rem', padding: .5 + 'rem'}}
             type="text"
             placeholder="Впишіть сюди назву вулиці"
             value={filter}
             onChange={(event) => setFilter(event.target.value)} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = {
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
