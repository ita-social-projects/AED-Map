import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";



const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  const handleChange = event => {
    props.setPlates(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Можливість використання</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handleChange}
          value={props.informational_plates}
        >
          <FormControlLabel value="PRESENT" control={<Radio />} label="Портативний" />
          <FormControlLabel value="PRESENT_IN_BUILDING" control={<Radio />} label="Тільки в будівлі"/>
          <FormControlLabel value="PRESENT_NEAR_APPLIANCE" control={<Radio />} label="Лише біля AED" />
          <FormControlLabel value="MISSING" control={<Radio />} label="Неможливо"/>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
