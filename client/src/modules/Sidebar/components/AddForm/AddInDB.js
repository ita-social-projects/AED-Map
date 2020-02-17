/* eslint-disable camelcase */
import { createItem } from '../../api';

const AddInDB = data => {
  const body = {
    ...data,
    location: {
      type: 'Point',
      coordinates: data.coordinates
    },
    storage_place: `Поверх ${data.floor}, ${data.location}`,
    language: 'Україномовний',
    phone: [data.phone]
  };
  createItem(body);
};

export default AddInDB;
