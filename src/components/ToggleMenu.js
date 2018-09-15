import React, { Component } from "react";

export class ToggleMenu extends Component {
  render() {
    return (
      <div>
        <button className="togle-menu" onClick={this.props.onClick}>
          Toggle Menu
        </button>
      </div>
    );
  }
}

export default ToggleMenu;
