import points from "./points";

const geoJsonData = {
  type: "FeatureCollection",
  features: points.map(point => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [point.lng, point.lat]
    },
    properties: {
      title: point.title
    }
  }))
};
export default geoJsonData;
