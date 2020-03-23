/* eslint-disable camelcase */
import React from 'react';
import MyForm from '../../../../shared/Form';
import INITIAL_VALUES from './const';
import { createItem } from '../../api';

const AddForm = () => {
  const hadleSubmit = async data => {
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

    await createItem(body);
  };
  return (
    <MyForm
      INITIAL_VALUES={INITIAL_VALUES}
      submitAction={hadleSubmit}
    />
  );
};

export default AddForm;
