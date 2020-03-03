/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyForm from '../../../../shared/Form';
import AddItRedux from './AddItRedux';
import AddInDB from './AddInDB';
import { createDefPoint } from '../ItemList/actions/list';
import INITIAL_VALUES from './const';

const AddForm = ({ createDef }) => {
  return (
    <MyForm
      INITIAL_VALUES={INITIAL_VALUES}
      SubmitAction={async data => {
        const res = await AddInDB(data);
        const id = res.data.defibrillator._id;
        AddItRedux(data, createDef,id);
      }}
    />
  );
};
AddForm.propTypes = {
  createDef: PropTypes.func.isRequired
};

export default connect(null, { createDef: createDefPoint })(
  AddForm
);
