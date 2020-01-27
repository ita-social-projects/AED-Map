import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Sidebar from './modules/Sidebar';
import MapHolder from './modules/MapHolder';

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Sidebar />
        <MapHolder />
      </div>
    </div>
  );
};

export default connect()(App);
