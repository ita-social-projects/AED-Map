import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { setFilter } from '../../../../actions/filter';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 60
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const FormButtons = ({ handleReset, setFilterValue }) => {
  const classes = useStyles();

  const onClear = () => {
    setFilterValue(null);
    handleReset();
  };

  return (
    <div className={classes.buttonContainer}>
      <Button
        type="reset"
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

FormButtons.propTypes = {
  handleReset: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFilterValue: setFilter
};

export default connect(
  null,
  mapDispatchToProps
)(FormButtons);
