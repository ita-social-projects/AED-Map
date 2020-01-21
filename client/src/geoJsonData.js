const features = (points) =>
  points.map((point) => ({
    type: 'Feature',
    geometry: {
      type: point.location.type,
      coordinates: point.location.coordinates,
    },
    properties: {
      title: point.title,
    },
  }));

const geoJsonData = (points) => ({
  type: 'FeatureCollection',
  features: features(points),
});

export default geoJsonData;
