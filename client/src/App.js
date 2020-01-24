import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Sidebar from './modules/Sidebar';
import MapHolder from './modules/MapHolder';
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
