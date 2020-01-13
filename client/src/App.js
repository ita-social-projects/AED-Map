import React, { useEffect, useCallback } from "react";
import "./App.css";
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapHolder from "./components/MapHolder";
import myClasses from "./styles";

import { fetchDefs } from './actions/def';
import { connect } from 'react-redux';

const App = ({ fetchDefs, defsState, filteredDefs }) => {
  useEffect(useCallback(() => {
    fetchDefs('/defibrillators.json');
  }, [fetchDefs]), []);

  if(defsState.loading) return <p>Loading...</p>;
  if(defsState.error) return <p>Something wrong there</p>;
  return (
    <div className="App">
      <div className={myClasses.mainStyle}>
        <Sidebar />
        <MapHolder />
      </div>
    </div>
  );
};

const mapStateToProps = ({defs, filter}) => ({
	defsState: defs,
	filter,
	filteredDefs: defs.data
                  .filter(item => item.address.toLowerCase()
						               .includes(filter.toLowerCase())),
});
const mapDispatchToProps = {
  fetchDefs
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
