import { connect } from 'react-redux';
import React from 'react';
import {
   setFullTime,
   setFromTime,
   setUntilTime,
} from '../../modules/Sidebar/components/EditForm/actions/setFullTime';
import {
   Checkbox,
   FormControlLabel,
   InputLabel,
   FormControl,
   NativeSelect,
   Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   timeSelectors: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '.2rem .5rem',
   },
   label: {
      fontSize: '.8rem',
   },
   checkbox: {
      margin: '0 0  .5rem .5rem',
   },
});

function hours(start, end) {
   return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
}

const TimeOptions = ({ disabledValue }) => {
   return (
      <>
         <option disabled>{disabledValue}</option>
         {hours(0, 23).map((hour) => (
            <option value={hour} key={hour}>
               {hour < 10 ? '0' + hour : hour}
               :00
            </option>
         ))}
      </>
   );
};

const MyTimeField = ({
   label,
   setTime,
   fullTimeStatus,
   setFromTime,
   setUntilTime,
   timeFrom,
   timeUntil,
}) => {
   const checkedHandler = (e) => {
      setTime(e.target.checked);
   };

   const changeTime = (e) => {
      e.target.name === 'availableFrom'
         ? setFromTime(e.target.value)
         : setUntilTime(e.target.value);
   };

   const classes = useStyles();

   return (
      <Box>
         <InputLabel className={classes.label}>{label}</InputLabel>
         <div className={classes.timeSelectors}>
            <FormControl>
               <NativeSelect
                  defaultValue={timeFrom}
                  disabled={fullTimeStatus}
                  onChange={changeTime}
                  inputProps={{
                     name: 'availableFrom',
                  }}
               >
                  <TimeOptions disabledValue={'з'} />
               </NativeSelect>
            </FormControl>

            <FormControl>
               <NativeSelect
                  defaultValue={timeUntil}
                  disabled={fullTimeStatus}
                  onChange={changeTime}
                  inputProps={{
                     name: 'availableUntil',
                  }}
               >
                  <TimeOptions disabledValue={'до'} />
               </NativeSelect>
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
   (state) => ({
      fullTimeStatus: state.setFullTime.fullTime,
      timeFrom: state.setFullTime.timeFrom,
      timeUntil: state.setFullTime.timeUntil,
   }),
   (dispatch) => ({
      setTime: (value) => dispatch(setFullTime(value)),
      setFromTime: (value) => dispatch(setFromTime(value)),
      setUntilTime: (value) => dispatch(setUntilTime(value)),
   })
)(MyTimeField);
