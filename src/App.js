import React, { Component } from "react";
import "./App.css";
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapHolder from "./components/MapHolder";
import mapboxgl from "mapbox-gl";
import mapPin from "./icons/icons-location-world.png";

class App extends Component {
  state = {
    lng: 24.0311,
    lat: 49.842,
    zoom: 12.5,
    map: {},
    points: [
      {
        id: 1,
        lng: 24.031555,
        lat: 49.841918,
        title: "Lviv townhall",
        desc: "Lviv main Point"
      },
      {
        id: 2,
        lng: 23.9991,
        lat: 49.832658,
        title: "Softserve Lviv 2",
        desc: "our main center"
      },
      {
        id: 3,
        lng: 23.9977,
        lat: 49.8331,
        title: "Softserve Lviv 4",
        desc: "cookies and sweets (Tue & Thu)"
      },
      {
        id: 4,
        lng: 23.997047,
        lat: 49.83249,
        title: "Softserve Lviv 9",
        desc: "A new one"
      }
    ]
  };

  createMap = htmlElement => {
    this.setState(
      {
        map: new mapboxgl.Map({
          container: htmlElement,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        })
      },
      this.setMapFunctionality
    );
  };

  setMapFunctionality = () => {
    const map = this.state.map;
    map.on("move", () => {
      this.changeMapParams();
    });
    map.on("click", "points", function(e) {
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });
    });
    map.on("load", () => {
      map.loadImage(mapPin, (error, image) => {
        if (error) throw error;
        map.addImage("pointer", image, {
          pixelRatio: 2
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: this.state.points.map(point => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [point.lng, point.lat]
                },
                properties: {
                  title: point.title
                }
              }))
            }
          },
          layout: {
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
        });
      });
    });
  };

  changeMapParams = () => {
    const map = this.state.map;
    this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2)
    });
  };

  flyToPin = pinId => {
    const point = this.state.points.find(
      element => element.id === pinId
    );
    this.state.map.flyTo({
      center: [point.lng, point.lat],
      zoom: 18
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Main" style={mainStyle}>
          <Sidebar
            points={this.state.points}
            flyToPin={this.flyToPin}
          />
          <MapHolder
            points={this.state.points}
            createMap={this.createMap}
            lng={this.state.lng}
            lat={this.state.lat}
            zoom={this.state.zoom}
            changeMapParams={this.changeMapParams}
          />
        </div>
      </div>
    );
  }
}
const mainStyle = {
  display: "flex",
  width: "100%"
};
export default App;
