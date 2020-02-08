import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
  },
  addButtonStyle: {
    width: '100%',
    marginTop: 10
  }
});

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.sidebarStyle}>
        <Header />
        <Route path="/" exact component={ItemList} />
        <Route path="/add-form" component={AddForm} />
        <Route path="/" exact>
          <Link to="/add-form">
            <Button
              className={classes.addButtonStyle}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Додати новий дефібрилятор
            </Button>
          </Link>
        </Route>
      </div>
    </Router>
  );
};

export default Sidebar;
