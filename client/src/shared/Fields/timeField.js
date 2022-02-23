import { connect } from 'react-redux';
import React from 'react';
import {
  setFullTime,
  setFromTime,
  setUntilTime
} from '../../modules/Sidebar/components/EditForm/actions/setFullTime';
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const MuiMenuItem = React.forwardRef((props, ref) => {
  return <MenuItem ref={ref} {...props} />;
});

const useStyles = makeStyles({
  timeSelectors: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.2rem .5rem',
    maxHeight: '100px'
  },
  checkbox: {
    margin: '0 0 .5rem 0'
  }
});

function hours(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const MyTimeField = ({
  label,
  setTime,
  fullTimeStatus,
  setFromTime,
  setUntilTime,
  timeFrom,
  timeUntil
}) => {
  const checkedHandler = e => {
    setTime(e.target.checked);
  };

  const changeTime = e => {
    e.target.name === 'availableFrom'
      ? setFromTime(e.target.value)
      : setUntilTime(e.target.value);
  };

  const classes = useStyles();

  return (
    <Box>
      <FormHelperText>{label}</FormHelperText>
      <div className={classes.timeSelectors}>
        <FormControl>
          <Select
            id={'from'}
            disabled={fullTimeStatus}
            value={timeFrom}
            onChange={changeTime}
            inputProps={{
              name: 'availableFrom'
            }}
          >
            <MuiMenuItem disabled>з</MuiMenuItem>
            {hours(0, 23).map(hour => (
              <MuiMenuItem
                value={hour}
                key={hour}
                disabled={timeUntil <= hour}
              >
                {`${hour}`.padStart(2, '0')}:00
              </MuiMenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            id="until"
            disabled={fullTimeStatus}
            value={timeUntil}
            onChange={changeTime}
            inputProps={{
              name: 'availableUntil'
            }}
          >
            <MuiMenuItem disabled>до</MuiMenuItem>
            {hours(0, 23).map(hour => (
              <MuiMenuItem
                value={hour}
                key={hour}
                disabled={timeFrom >= hour}
              >
                {`${hour}`.padStart(2, '0')}
                :00
              </MuiMenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FormControlLabel
        control={
          <Checkbox
            name="fullTimeAvailable"
            className={classes.checkbox}
            checked={fullTimeStatus}
            onChange={checkedHandler}
          />
        }
        label="Цілодобово"
      />
    </Box>
  );
};

export default connect(
  state => ({
    fullTimeStatus: state.setFullTime.fullTime,
    timeFrom: state.setFullTime.timeFrom,
    timeUntil: state.setFullTime.timeUntil
  }),
  dispatch => ({
    setTime: value => dispatch(setFullTime(value)),
    setFromTime: value => dispatch(setFromTime(value)),
    setUntilTime: value => dispatch(setUntilTime(value))
  })
)(MyTimeField);
