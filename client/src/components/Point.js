import React, { Component } from "react";
import myClasses from "../styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

class Point extends Component {
  render() {
    return (
      <div
        className={myClasses.pointCard}
        onClick={this.props.flyToPin.bind(this, this.props.point.id)}
      >
        <div className={myClasses.pointCardInfo}>
          <h3 className={myClasses.titleStyle}>
            Title: {this.props.point.title}
          </h3>
          <p className={myClasses.descStyle}>
            Description: {this.props.point.desc}
          </p>
        </div>
        <div className={myClasses.eventButtons}>
          <button className={myClasses.editItem} >
            <EditIcon />
          </button>
          <button className={myClasses.deleteItem}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default Point;
