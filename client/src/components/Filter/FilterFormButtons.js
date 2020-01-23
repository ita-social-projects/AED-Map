import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 60
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const FilterFormButtons = ({ onClear }) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<ClearIcon />}
        onClick={onClear}
      >
        CLEAR
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<DoneIcon />}
      >
        APPLY
      </Button>
    </div>
  );
};

FilterFormButtons.propTypes = {
  onClear: PropTypes.func.isRequired
};

export default FilterFormButtons;
