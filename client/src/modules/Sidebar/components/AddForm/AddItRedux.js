/* eslint-disable */
const AddItRedux = (data,createDef,id)=> {
  
  const set_obj ={
    ...data,
    actual_date:data.actualDate,
    _id: id,
    location: { type: 'Point', coordinates:data.coordinates },
    language: 'Україномовний',
    phone: [data.phone],
  };
  createDef(set_obj);
};

export default AddItRedux;
