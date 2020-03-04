const normalize = data => {
  return {
    title: data.title,
    address: data.address,
    floor: data.storage_place.match(/\d/)[0],
    informational_plates: data.informational_plates,
    phone: data.phone[0],
    additional_information: data.additional_information,
    storage_place: data.storage_place,
    accessibility: data.accessibility,
    coordinates: data.location.coordinates
  };
};

export default normalize;