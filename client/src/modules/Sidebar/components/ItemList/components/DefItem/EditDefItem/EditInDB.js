/* eslint-disable camelcase */
import { editItem } from '../../../../../api';
import dateTime from './date';

const EditInDB = data => {
  const body = {
    ...data,
    location: {
      type: 'Point',
      coordinates: data.coordinates
    },
    storage_place: `Поверх ${data.floor}`,
    language: 'Україномовний',
    phone: [data.phone],
    actual_date: dateTime()
  };
  delete body.coordinates;
  delete body.floor;
  editItem(body);
};

export default EditInDB;
