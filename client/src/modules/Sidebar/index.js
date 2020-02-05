import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import ItemList from './components/ItemList';
import AddForm from './components/AddForm';
import { sidebarWidth } from './styleConstants';

const useStyles = makeStyles({
  sidebarStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: sidebarWidth,
    padding: 20,
    maxHeight: '100vh',
    flexShrink: 0
  }
});
const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarStyle}>
      <Header />
      <ItemList />
      <AddForm />
    </div>
  );
};

export default Sidebar;
