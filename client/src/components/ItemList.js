import React from "react";
import Point from "./Point";
import points from "../points";

const ItemList = props => {
  return (
    <div>
      {points.map(point => (
        <Point
          key={point.id}
          point={point}
          flyToPin={props.flyToPin}
        />
      ))}
    </div>
  );
};

export default ItemList;
