import React from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { setFilter } from '../actions/filter';

const useStyle = createUseStyles({
  container: {
    flex: 1,
  },
  search: {
    width: '100%',
    height: '100%',
    marginBottom: '1rem',
    padding: '0.5rem',
    border: 'none',
    outline: 'none',
  },
});

const Search = ({ filter, setFilter }) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        type="text"
        placeholder="Впишіть сюди назву вулиці"
        value={filter.address}
        onChange={(event) =>
          setFilter({
            ...filter,
            address: event.target.value,
          })
        }
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
)(Search);
