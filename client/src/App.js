import React, { useEffect, useCallback } from 'react';
import './App.css';
// import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import MapHolder from './components/MapHolder';
import myClasses from './styles';

import { fetchDefs } from './actions/def';
import { connect } from 'react-redux';
import { defsFilterSelector } from './reducers/defReducer';
const App = ({ fetchDefs, defsState, filteredDefs }) => {
  useEffect(
    useCallback(() => {
      fetchDefs('/defibrillators.json');
    }, [fetchDefs]),
    [],
  );

  if (defsState.loading) return <p>Loading...</p>;
  if (defsState.error) return <p>Something wrong there</p>;
  return (
    <div className="App">
      <div className={myClasses.mainStyle}>
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
