import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';
import MapHolder from './components/MapHolder';
import myClasses from './styles';

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

export default connect()(App);
