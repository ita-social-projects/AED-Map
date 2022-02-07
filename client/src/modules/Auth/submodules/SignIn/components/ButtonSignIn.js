import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  personIcon: {
    color: '#00A654',
    fontSize: 50,
    marginTop: -8,

    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const ButtonSignIn = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      {user && <Link to="/account">
        <Tooltip title="Особистий кабінет">
          <PersonIcon fontSize="large" className={classes.personIcon} />
        </Tooltip>
      </Link>}
    </>
  );
};

ButtonSignIn.defaultProps = {
  user: null
};

ButtonSignIn.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default connect(
  state => ({
    user: state.user.user
  })
)(ButtonSignIn);
