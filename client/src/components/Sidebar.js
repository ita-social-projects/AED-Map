import React from "react";
import myClasses from "../styles";
import Header from "./Header";
import ItemList from "./ItemList";
import AddForm from "./AddForm";
import Filter from "./Filter";

const Sidebar = () => {
  return (
    <div className={myClasses.sidebarStyle}>
      <Header />
      <ItemList />
      <AddForm />
      <Filter />
    </div>
  );
};

export default Sidebar;
