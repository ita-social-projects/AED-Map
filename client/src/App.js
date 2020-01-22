import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';
import MapHolder from './components/MapHolder';
import myClasses from './styles';
import { fetchDefs } from './actions/def';
import { defsFilterSelector } from './reducers/defReducer';

const App = () => {
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
  fetchDefebs: fetchDefs,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
