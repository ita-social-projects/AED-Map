import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function AddAdressText(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(props.adress);

  React.useEffect(() => {
    setValue(props.adress);
  }, [props.adress]);
  React.useEffect(() => {
    let active = true;

    if (value.length > 2) {
      (async () => {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1Ijoic2FyYXRlYyIsImEiOiJjazViYjY4eHIxZXNlM2txeGJvY20waHpkIn0.LEO4h63DwhRB458fESisKg`,
        );
        const countries = await response.json();
        if (active) {
          setOptions(
            countries.features.map((elem) => {
              return elem;
            }),
          );
        }
      })();
    } else {
      setOpen(false);
      return undefined;
    }
    return () => {
      active = false;
    };
  }, [value]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      filterOptions={(x) => x} // for searching
      id="searcher"
      style={{ margin: '0px 23px' }}
      open={open}
      onOpen={() => {
        if (value.length > 0) setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={value}
      onChange={(event, selectedOption) => {
        if (selectedOption != null) {
          props.setAdress(selectedOption.place_name);
          props.setCoordinates(selectedOption.center);
          setValue(selectedOption.place_name);
        }
      }}
      getOptionLabel={(option) => option.place_name}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          label="Пошук Адреси"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}
