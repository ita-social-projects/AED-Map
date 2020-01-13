import React, { Component } from "react";
import Point from "./Point";

class ItemList extends Component {
  render() {
    return (
      <div>
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

export default ItemList;
