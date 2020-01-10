import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MapHolder from "./components/MapHolder";
import myClasses from "./styles";
import points from "./points";

const App = props => {
  const [state, setState] = useState({
    lng: 24.0311,
    lat: 49.842,
    zoom: 12.5
  });

  const flyToPin = pinId => {
    const point = points.find(
      element => element.id === pinId
    );
    setState({
      lng: point.lng,
      lat: point.lat,
      zoom: 18
    });
  };

  return (
    <div className="App">
      <div className={myClasses.mainStyle}>
        <Sidebar flyToPin={flyToPin} />
        <MapHolder
          lng={state.lng}
          lat={state.lat}
          zoom={state.zoom}
        />
      </div>
    </div>
  );
};

export default App;
