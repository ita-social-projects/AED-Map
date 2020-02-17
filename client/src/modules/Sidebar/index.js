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
import Alert from '../../shared/Alert';
import useAlert from '../../shared/Alert/useAlert';

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
    marginTop: '10px'
  },
  LinkStyle: {
    textDecoration: 'none'
  }
});

const Sidebar = () => {
  const classes = useStyles();
  const [alert, ShowAlert] = useAlert();
  return (
    <Router>
      <div className={classes.sidebarStyle}>
        <Header />
        <Route path="/" exact>
          <ItemList />
        </Route>
        <Route path="/add-form">
          <AddForm />
        </Route>
        <Route path="/" exact>
          <Link
            to="/add-form"
            className={classes.LinkStyle}
          >
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
        <Alert
          open={alert.open}
          massage={alert.massage}
          severity={alert.severity}
          handleClose={() => ShowAlert({ open: false })}
        />
      </div>
    </Router>
  );
};

export default Sidebar;