import React from 'react';
import { connect } from 'react-redux';
import { connect as connectFormik } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { setFilter } from '../../../../../../actions/filter';

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

const FormButtons = ({
  formik: { handleReset, isSubmitting },
  setFilterValue
}) => {
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
        disabled={isSubmitting}
      >
        APPLY
      </Button>
    </div>
  );
};

FormButtons.propTypes = {
  formik: PropTypes.shape({
    handleReset: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
  }).isRequired,
  setFilterValue: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFilterValue: setFilter
};

export default connect(
  null,
  mapDispatchToProps
)(connectFormik(FormButtons));
