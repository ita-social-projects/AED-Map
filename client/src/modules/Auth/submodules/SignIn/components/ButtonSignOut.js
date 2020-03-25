import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { socketAuthClose } from '../../../../../shared/websocket';
import { signOut } from '../../../actions/user';
import { fetchDefs, clearData } from '../../../../Sidebar/components/ItemList/actions/list';
import ConfirmationModalWrapper from '../../../../../shared/ConfirmationModalWrapper';

const useStyles = makeStyles({
  button: {
    height: 50,
    marginTop: 15
  }
});

const CustomButton = ({ handleOpen }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="primary" onClick={handleOpen}>
      Вийти з особистого кабінету
    </Button>
  );
};

CustomButton.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

const ButtonSignOut = ({ signOutSubmit, fetchDefItems, clearDefItems }) => {
  const handleSignOut = () => {
    signOutSubmit();
    socketAuthClose();
    clearDefItems();
    fetchDefItems();
  };

  return (
    <ConfirmationModalWrapper
      ButtonOpen={CustomButton}
      confirmHandle={handleSignOut}
      message="Дійсно бажаєте вийти з особистого кабінету?"
      messageAlert="Вихід успішно здійснено"
    />
  );
};

ButtonSignOut.propTypes = {
  signOutSubmit: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired,
  clearDefItems: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    signOutSubmit: () => dispatch(signOut()),
    fetchDefItems: () => dispatch(fetchDefs()),
    clearDefItems: () => dispatch(clearData()),
  })
)(ButtonSignOut);
