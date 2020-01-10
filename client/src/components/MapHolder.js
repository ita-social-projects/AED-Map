import React from "react";
import mapPin from "../icons/icons-location-world.png";
import myClasses from "../styles";
import Map from "./Map";
import geoJsonData from "../geoJsonData";
import symbolLayout from "../symbolLayout";

import { GeoJSONLayer, Image } from "react-mapbox-gl";

const MapHolder = props => {
  const symbolClick = event => {
    event.target.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat]
    });
  };

  const mouseEnter = event => {
    event.target.getCanvas().style.cursor = "pointer";
  };

  const mouseLeave = event => {
    event.target.getCanvas().style.cursor = "";
  };

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v11"
      className={myClasses.mapOuterStyle}
      center={[props.lng, props.lat]}
      zoom={[props.zoom]}
    >
      <Image
        id={"pointer"}
        url={mapPin}
        options={{ pixelRatio: 2 }}
      />
      <GeoJSONLayer
        id={"points"}
        type={"symbol"}
        data={geoJsonData}
        symbolLayout={symbolLayout}
        symbolOnClick={symbolClick}
        symbolOnMouseEnter={mouseEnter}
        symbolOnMouseLeave={mouseLeave}
      />
    </Map>
  );
};

export default MapHolder;
