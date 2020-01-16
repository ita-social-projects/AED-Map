import React, { useEffect, useCallback } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MapHolder from './components/MapHolder';
import { fetchDefs } from './actions/def';
import { connect } from 'react-redux';
import { defsFilterSelector } from './reducers/defReducer';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
  loading: {
    color: '#fff',
    fontSize: '35px',
  },
});

const App = ({ fetchDefs, defsState, filteredDefs }) => {
  const classes = useStyle();

  useEffect(
    useCallback(() => {
      fetchDefs('/defibrillators.json');
    }, [fetchDefs]),
    [],
  );

  if (defsState.loading)
    return <p className={classes.loading}>Loading...</p>;
  if (defsState.error) return <p>Something wrong there</p>;
  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Sidebar />
        <MapHolder />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defsState: state.defs,
  filter: state.filter,
  filteredDefs: defsFilterSelector(state),
});
const mapDispatchToProps = {
  fetchDefs,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
