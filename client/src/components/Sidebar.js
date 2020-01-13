import React, { Component } from "react";
import myClasses from "../styles";
import Header from "./Header";
import ItemList from "./ItemList";
import AddForm from "./AddForm";
import Filter from "./Filter";

class Sidebar extends Component {
  render() {
    return (
      <div className={myClasses.sidebarStyle}>
        <Header />
        <ItemList
          points={this.props.points}
          flyToPin={this.props.flyToPin}
        />
        <AddForm />
        <Filter />
      </div>
    );
  }
}
export default Sidebar;
