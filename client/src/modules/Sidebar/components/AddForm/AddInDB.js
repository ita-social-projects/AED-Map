/* eslint-disable camelcase */
import axios from 'axios';

const AddInDB = ({
  title,
  adress,
  coordinates,
  floor,
  location,
  accessibility,
  phone,
  additional_information,
  actual_date
}) => {
  const body = {
    title,
    address: adress,
    location: { type: 'Point', coordinates },
    actual_date,
    storage_place: `Поверх ${floor}, ${location}`,
    accessibility,
    language: 'Україномовний',
    informational_plates: 'Присутні тільки біля приладу',
    phone: [phone],
    additional_information
  };
  axios.post('/api/defibrillators', body).then(response => {
    // eslint-disable-next-line
    console.log(response);
  });
};

export default AddInDB;
