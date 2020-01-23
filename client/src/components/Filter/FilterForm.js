import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { setFilter } from '../../actions/filter';
import FilterFormButtons from './FilterFormButtons';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    margin: 8,
    width: 250
  },
  select: {
    margin: 8,
    width: 250
  }
}));

const FilterForm = ({
  title,
  setTitle,
  address,
  setAddress,
  language,
  setLanguage,
  setIsFilter,
  setFilter
}) => {
  const classes = useStyles();

  const onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        return setTitle(value);
      case 'address':
        return setAddress(value);
      case 'language':
        return setLanguage(value);
      default:
        return null;
    }
  };

  const clearForm = () => {
    setTitle('');
    setAddress('');
    setLanguage('');
    setFilter({
      title: '',
      address: '',
      language: ''
    });
    setIsFilter(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (title || address || language) {
      setFilter({
        title,
        address,
        language
      });
      setIsFilter(true);
    } else {
      setIsFilter(false);
      setFilter({
        title: '',
        address: '',
        language: ''
      });
    }
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        className={classes.input}
        label="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <TextField
        className={classes.input}
        label="Address"
        name="address"
        value={address}
        onChange={onChange}
      />
      <FormControl className={classes.select}>
        <InputLabel id="language">
          Language interface
        </InputLabel>
        <Select
          name="language"
          labelId="language"
          value={language}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>Всі</em>
          </MenuItem>
          <MenuItem value="англомовний">
            Англомовний
          </MenuItem>
          <MenuItem value="україномовний">
            Україномовний
          </MenuItem>
          <MenuItem value="російськомовний">
            Російськомовний
          </MenuItem>
        </Select>
      </FormControl>
      <FilterFormButtons onClear={clearForm} />
    </form>
  );
};

FilterForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setIsFilter: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setFilter
};

export default connect(
  null,
  mapDispatchToProps
)(FilterForm);
