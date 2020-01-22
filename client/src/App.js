import React, { useEffect, useCallback } from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import MapHolder from './components/MapHolder';
import myClasses from './styles';
import { fetchDefs } from './actions/def';
import { defsFilterSelector } from './reducers/defReducer';

const App = ({ fetchDefebs, defsState }) => {
  useEffect(
    useCallback(() => {
      fetchDefebs('/defibrillators.json');
    }, [fetchDefebs]),
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

App.defaultProps = {
  fetchDefebs: null,
  defsState: {},
};

App.propTypes = {
  fetchDefebs: PropTypes.func,
  defsState: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    data: PropTypes.array,
  }),
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
