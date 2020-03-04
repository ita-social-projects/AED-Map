/* eslint-disable */
const EditInRedux = (data, editDef) => {
  const set_obj = {
    _id: data._id,
    title: data.title,
    address: data.address,
    location: {
      type: 'Point',
      coordinates: data.coordinates
    },
  };
  editDef(data._id, set_obj);
};

export default EditInRedux;
