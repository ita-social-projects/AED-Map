const features = points => {
  return points.map(point => {
    return {
      type: 'Feature',
      geometry: {
        type: point.location.type,
        coordinates: point.location.coordinates
      },
      properties: {
        title: point.title,
        defID: point._id
      }
    };
  });
};

const geoJsonData = points => ({
  type: 'FeatureCollection',
  features: features(points)
});

export default geoJsonData;
