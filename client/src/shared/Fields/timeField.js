import { connect } from "react-redux";
import React from "react";
import {
   setFullTime,
   setFromTime,
   setUntilTime,
} from "../../modules/Sidebar/components/EditForm/actions/setFullTime";
import { MyTextField } from "./index";
import { Checkbox, FormControlLabel, InputLabel } from "@material-ui/core";

const MyTimeField = ({
   label,
   setTime,
   fullTimeStatus,
   setFromTime,
   setUntilTime,
   timeFrom,
   timeUntil,
}) => {
   console.log(timeFrom, timeUntil);
   const checkedHandler = (e) => {
      setTime(e.target.checked);
   };

   const changeTime = (e) => {
      e.target.name === "availableFrom"
         ? setFromTime(e.target.value)
         : setUntilTime(e.target.value);
   };

   return (
      <>
         <InputLabel id={label}>{label}</InputLabel>
         <MyTextField
            name="availableFrom"
            value={timeFrom}
            onChange={changeTime}
            type="time"
            disabled={fullTimeStatus}
         />
         <MyTextField
            name="availableUntil"
            value={timeUntil}
            onChange={changeTime}
            type="time"
            disabled={fullTimeStatus}
         />
         <FormControlLabel
            control={
               <Checkbox
                  name="fullTimeAvailable"
                  checked={fullTimeStatus}
                  onChange={checkedHandler}
               />
            }
            label="Цілодобово"
         />
      </>
   );
};

export default connect(
   (state) => ({
      fullTimeStatus: state.setFullTime.fullTime,
      timeFrom: state.setFromTime.timeFrom,
      timeUntil: state.setUntilTime.timeUntil,
   }),
   (dispatch) => ({
      setTime: (value) => dispatch(setFullTime(value)),
      setFromTime: (value) => dispatch(setFromTime(value)),
      setUntilTime: (value) => dispatch(setUntilTime(value)),
   })
)(MyTimeField);