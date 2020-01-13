import React, { Component } from "react";
import "./App.css";
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapHolder from "./components/MapHolder";
import myClasses from "./styles";

class App extends Component {
  state = {
    lng: 24.0311,
    lat: 49.842,
    zoom: 12.5,

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

  flyToPin = pinId => {
    const point = this.state.points.find(
      element => element.id === pinId
    );
    this.setState({
      lng: point.lng,
      lat: point.lat,
      zoom: 18
    });
  };

  render() {
    return (
      <div className="App">
        <div className={myClasses.mainStyle}>
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
export default App;
