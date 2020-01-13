import React, { Component } from "react";
import Point from "./Point";
import myClasses from "../styles";

class Sidebar extends Component {
  render() {
    return (
      <div className={myClasses.sidebarStyle}>
        {this.props.points.map(point => (
          <Point
            key={point.id}
            point={point}
            flyToPin={this.props.flyToPin}
          />
        ))}
      </div>
    );
  }
}
export default Sidebar;
