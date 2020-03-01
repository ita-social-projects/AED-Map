import React from 'react';
import { connect } from 'react-redux';
import { connect as connectFormik } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { resetFilter } from './actions/filter';
import { hidePopup } from '../../../../../MapHolder/actions/popupDisplay';
import {
  fetchDefs,
  setPage,
  setData
} from '../../../ItemList/actions/list';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const FormButtons = ({
  formik: { handleReset, isSubmitting, dirty },
  resetFilterValue,
  fetchDefItems,
  filter,
  popupData,
  hidePopup,
  resetPage,
  resetData
}) => {
  const classes = useStyles();

  const resetPagination = (page, data) => {
    resetPage(page);
    resetData(data);
  };

  const onClear = () => {
    if (filter) {
      if (popupData) {
        hidePopup();
      }

      resetPagination(1, []);
      fetchDefItems();
    }
    resetFilterValue();
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
        Очистити
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<DoneIcon />}
        disabled={!dirty || isSubmitting}
      >
        Застосувати
      </Button>
    </div>
  );
};

FormButtons.defaultProps = {
  filter: null,
  popupData: null
};
FormButtons.propTypes = {
  formik: PropTypes.shape({
    handleReset: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired
  }).isRequired,
  resetFilterValue: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object]),
  popupData: PropTypes.oneOfType([PropTypes.object]),
  hidePopup: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired
};

export default connect(
  state => ({
    filter: state.filter,
    popupData: state.popupData
  }),
  {
    resetFilterValue: resetFilter,
    fetchDefItems: fetchDefs,
    resetPage: page => setPage(page),
    resetData: data => setData(data),
    hidePopup
  }
)(connectFormik(FormButtons));
