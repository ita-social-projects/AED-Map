import React from "react";
import myClasses from "../styles";

function Point(props) {
  return (
    <div
      className={myClasses.pointCard}
      onClick={props.flyToPin.bind(this, props.point.id)}
    >
      <h3 className={myClasses.titleStyle}>
        Title: {props.point.title}
      </h3>
      <p className={myClasses.descStyle}>
        Description: {props.point.desc}
      </p>
    </div>
  );
}

export default Point;
