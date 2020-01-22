/* eslint-disable */
const AddItRedux = ({
  title,
  adress,
  coordinates,
  floor,
  location,
  accessibility,
  phone,
  additional_information,
  actual_date
},createDef)=> {
  
  const set_obj ={
    id: `f${(~~(Math.random() * 1e8)).toString(16)}`,// generate id
    title,
    address:adress,
    location: { type: 'Point', coordinates },
    actual_date,
    floor,
    storage_place: location,
    accessibility,
    language: 'Україномовний',
    informational_plates: 'Присутні тільки біля приладу',
    phone: [phone],
    additional_information
  };
  console.log(set_obj)
  createDef(set_obj);
};

export default AddItRedux;
