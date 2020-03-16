/* eslint-disable camelcase */
import { createItem } from '../../api';

const AddInDB = async data => {
  const body = {
    ...data,
    actual_date: data.actualDate,
    location: {
      type: 'Point',
      coordinates: data.coordinates
    },
    storage_place: `Поверх ${data.floor}, ${data.storage_place}`,
    language: 'Україномовний'
  };
  const respond = await createItem(body);
  return respond;
};

export default AddInDB;
