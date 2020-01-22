import React, { Component } from 'react';
import myClasses from '../styles';
import axios from 'axios';
import AddAdressText from './AddAdressText';
import PlatesSelect from './PlatesSelect';
import AddTelephone from './AddTelephone';
import AddMoreInfo from './AddMoreInfo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { createDefPoint } from '../actions/def';
const Form = ({ createDefPoint }) => {
  const DefaultStyle = {
    paddingTop: '10px',
    margin: '0px 23px',
    marginBottom: '23px',
  };
  const AddItRedux = (props) => {
    let date = new Date();
    let month = date.getMonth();
    let actual_date = `${date.getFullYear()}-${
      month < 10 ? `0${month + 1}` : month + 1
    }-${date.getDate()}`; //відформатована поточна дата
    const obj = {
      id: `f${(~~(Math.random() * 1e8)).toString(16)}`, //generate id
      title: title,
      address: adress,
      location: { type: 'Point', coordinates: coordinates },
      actual_date: actual_date,
      floor: floor,
      storage_place: location,
      accessibility: accessibility,
      language: 'Україномовний',
      informational_plates: 'Присутні тільки біля приладу',
      phone: [phone],
      additional_information: additional_information,
    };
    createDefPoint(obj);
    AddInDB(actual_date);
    Clean()
  };

  const AddInDB = (actual_date) => {
    let body = {
      title: title,
      address: adress,
      location: { type: 'Point', coordinates: coordinates },
      actual_date: actual_date,
      storage_place: `Поверх ${floor}, ${location}`,
      accessibility: accessibility,
      language: 'Україномовний',
      informational_plates: 'Присутні тільки біля приладу',
      phone: [phone],
      additional_information: additional_information,
    };
    axios
      .post('http://localhost:3012/create', body)
      .then(function(response) {
        console.log(response);
      });
  };

  const Clean =()=>{
    setAdress('');
    setPlates('PRESENT');
    setPhone('');
    addMore('');
    setLocation('')
    setTitle('')
    setFloor(0)
    setAccessibility('')
    setCoordinates([''])
  }
  const [adress, setAdress] = React.useState('');
  const [informational_plates, setPlates] = React.useState('PRESENT',);
  const [phone, setPhone] = React.useState('');
  const [additional_information, addMore] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [floor, setFloor] = React.useState(0);
  const [accessibility, setAccessibility] = React.useState('');
  const [coordinates, setCoordinates] = React.useState(['']); //[Longitude,Latitude]

  return (
    <div
      className={myClasses.formStile}
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '10px 0px',
      }}>
      <AddAdressText
        setCoordinates={setCoordinates}
        adress={adress}
        setAdress={setAdress}
      />
      <TextField
        id="Title"
        value={title}
        label="Введіть назву"
        style={DefaultStyle}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <TextField
        id="Accessibility"
        label="Коли доступний пристрій?"
        style={DefaultStyle}
        value={accessibility}
        onChange={(event) => {
          setAccessibility(event.target.value);
        }}
      />
      <TextField
        id="Location"
        label="Де розташований в будівлі?"
        style={DefaultStyle}
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <TextField
        style={DefaultStyle}
        onChange={(event) => {
          setFloor(event.target.value);
        }}
        value={floor == 0 ? '' : floor}
        id="Floor"
        label="На якому поверсі знаходиться?"
        type="number"
        min="0"
        max="10"
        step="1"
      />
      <PlatesSelect
        informational_plates={informational_plates}
        setPlates={setPlates}
      />
      <AddTelephone phone={phone} setPhone={setPhone} />
      <AddMoreInfo
        additional_information={additional_information}
        addMore={addMore}
      />
      <Button
        style={{ margin: '23px' }}
        variant="contained"
        color="primary"
        size="large"
        onClick={AddItRedux}
        startIcon={<SaveIcon />}>
        Зберегти
      </Button>
    </div>
  );
};

export default connect(null, { createDefPoint })(Form);
