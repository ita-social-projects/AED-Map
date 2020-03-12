import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'formik';
import PropTypes from 'prop-types';
import options from './const';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  optionsGroup: {
    paddingTop: 10
  }
}));

const PlatesSelect = ({ formik }) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">
          Відповідні підказки в будівлі
        </FormLabel>
        <RadioGroup
          className={classes.optionsGroup}
          onChange={e =>
            formik.setFieldValue(
              'informational_plates',
              e.target.value
            )
          }
          value={formik.values.informational_plates}
        >
          {options.map(value => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={value}
            />
          ))}
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
  }).isRequired
};

export default connect(PlatesSelect);
