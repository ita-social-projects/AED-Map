import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {connect} from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

const PlatesSelect = ({formik}) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Можливість використання</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={e =>formik.setFieldValue('informational_plates',e.target.value)}
          value={formik.values.informational_plates}
        >
          <FormControlLabel value="PRESENT" control={<Radio />} label="Портативний" />
          <FormControlLabel value="PRESENT_IN_BUILDING" control={<Radio />} label="Тільки в будівлі" />
          <FormControlLabel value="PRESENT_NEAR_APPLIANCE" control={<Radio />} label="Лише біля AED" />
          <FormControlLabel value="MISSING" control={<Radio />} label="Неможливо" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

PlatesSelect.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.shape({
      informational_plates: PropTypes.string
    }),
    setFieldValue: PropTypes.func.isRequired
  }).isRequired,
};

export default connect(PlatesSelect);