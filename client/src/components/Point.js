import React, { Component } from "react";
import myClasses from "../styles";

class Point extends Component {
  render() {
    return (
      <div
        className={myClasses.pointCard}
        onClick={this.props.flyToPin.bind(
          this,
          this.props.point.id
        )}
      >
        <h3 className={myClasses.titleStyle}>
          Title: {this.props.point.title}
        </h3>
        <p className={myClasses.descStyle}>
          Description: {this.props.point.desc}
        </p>
      </div>
    );
  }
}

export default Point;
