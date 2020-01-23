// eslint-disable-next-line import/prefer-default-export
export const flyToPin = (id, items, setMap) => {
  const point = items.find((element) => element.id === id);
  const [lng, lat] = point.location.coordinates;
  setMap({
    lng,
    lat,
    zoom: 18
  });
};
