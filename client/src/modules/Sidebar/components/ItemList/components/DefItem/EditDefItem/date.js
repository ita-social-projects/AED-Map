const dateTime = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = (`0${  d.getMonth() + 1}`).slice(-2);
  const day = (`0${  d.getDate()}`).slice(-2);
  const datestring = `${year  }-${  month  }-${  day}`;
  return datestring;
};

export default dateTime;