import React, { Component } from "react";
import mapPin from "../icons/icons-location-world.png";
import myClasses from "../styles";

import ReactMapboxGl, {
  GeoJSONLayer,
  Image
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA"
});

class MapHolder extends Component {
  state = {
    GEO_JSON_DATA: {
      type: "FeatureCollection",
      features: this.props.points.map(point => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.lng, point.lat]
        },
        properties: {
          title: point.title
        }
      }))
    },

    SYMBOL_LAYOUT: {
      "icon-image": "pointer",
      "icon-size": 1,
      "icon-offset": [0, -20],
      "text-field": ["get", "title"],
      "text-font": [
        "Open Sans Semibold",
        "Arial Unicode MS Bold"
      ],
      "text-offset": [0, 0.2],
      "text-anchor": "top"
    }
  };

  symbolClick = event => {
    event.target.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat]
    });
  };

  mouseEnter = event => {
    event.target.getCanvas().style.cursor = "pointer";
  };

  mouseLeave = event => {
    event.target.getCanvas().style.cursor = "";
  };

  render() {
    return (
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v11"
        className={myClasses.mapOuterStyle}
        center={[this.props.lng, this.props.lat]}
        zoom={[this.props.zoom]}
      >
        <Image
          id={"pointer"}
          url={mapPin}
          options={{ pixelRatio: 2 }}
        />
        <GeoJSONLayer
          id={"points"}
          type={"symbol"}
          data={this.state.GEO_JSON_DATA}
          symbolLayout={this.state.SYMBOL_LAYOUT}
          symbolOnClick={this.symbolClick}
          symbolOnMouseEnter={this.mouseEnter}
          symbolOnMouseLeave={this.mouseLeave}
        />
      </Map>
    );
  }
}

export default MapHolder;
