import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = createUseStyles({
  select: {
    margin: 8,
    width: 250
  }
});

const FormSelect = ({ language, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.select}>
      <InputLabel id="language">
        Language interface
      </InputLabel>
      <Select
        name="language"
        labelId="language"
        value={language}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Всі</em>
        </MenuItem>
        <MenuItem value="англомовний">Англомовний</MenuItem>
        <MenuItem value="україномовний">
          Україномовний
        </MenuItem>
        <MenuItem value="російськомовний">
          Російськомовний
        </MenuItem>
      </Select>
    </FormControl>
  );
};

FormSelect.propTypes = {
  language: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default FormSelect;
