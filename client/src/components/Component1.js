import React, { Component } from "react";

class Component1 extends Component {
  state = {
    isLogged: true
  };
  render() {
    return (
      (this.state.isLogged && (
        <div>Hello logged user!</div>
      )) || <div>Hello guest!</div>
    );
  }
}

export default Component1;
