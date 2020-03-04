/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyForm from '../../../../../../../shared/Form';
import EditInRedux from './EditInRedux';
import EditInDB from './EditInDB';
import { editDefPoint } from '../../../actions/list';
import { fetchSingleDefById } from '../../../../../api/index';
import normalize from './normalizeData';
import Loader from '../../../../../../../shared/Loader';
import cancelToken from '../../../../../../../shared/cancel-token';

const defCancelToken = cancelToken();

const useStyles = makeStyles({
  loader: {
    padding: '44%',
  }
});

const EditForm = ({ editDef }) => {
  const classes = useStyles();
  const { href } = window.location;
  const id = href.slice(href.lastIndexOf('/') + 1);

  const [def, setDef] = useState(null);

  useEffect(() => {
    const funct = async () => {
      setDef(null);
      const res = await fetchSingleDefById(id);
      let { defibrillator } = res.data;
      defibrillator = normalize(defibrillator);
      setDef(defibrillator);
    };
    funct();
    return () => {
      defCancelToken.cancel();
    };
  }, [id]);
  return def ? (
    <MyForm
      INITIAL_VALUES={def}
      SubmitAction={data => {
        EditInRedux({ _id: id, ...data }, editDef);
        EditInDB({ _id: id, ...data });

      }}
    />
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
};

EditForm.propTypes = {
  editDef: PropTypes.func.isRequired
};

export default connect(null, {
  editDef: editDefPoint
})(EditForm);
