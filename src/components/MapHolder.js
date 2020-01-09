import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import myClasses from "../styles";

class MapHolder extends Component {
  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA";
    this.props.createMap(this.mapContainer);
  }

  render() {
    return (
      <div className={myClasses.mapOuterStyle}>
        <div className={myClasses.coordsStyle}>
          Longitude: {this.props.lng} | Latitude:
          {this.props.lat} | Zoom: {this.props.zoom}
        </div>
        <div
          ref={el => (this.mapContainer = el)}
          className={myClasses.mapStyle}
        />
      </div>
    );
  }
}

export default MapHolder;
