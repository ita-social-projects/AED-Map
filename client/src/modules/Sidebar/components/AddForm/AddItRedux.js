/* eslint-disable */
const AddItRedux = (data,createDef)=> {
  
  const set_obj ={
    ...data,
    id: `f${(~~(Math.random() * 1e8)).toString(16)}`,// generate id
    location: { type: 'Point', coordinates:data.coordinates },
    language: 'Україномовний',
    phone: [data.phone],
  };
  createDef(set_obj);
};

export default AddItRedux;
