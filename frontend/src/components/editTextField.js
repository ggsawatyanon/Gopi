import React from "react";
import { Component } from "react";

class ElementMaker extends Component {
  render() {
    return (
      <span>
        {
          this.props.showInputEle ? (
            <input
              type="text"
              value={this.props.value}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={this.props.handleDoubleClick}
              style={{
                display: "inline-block",
                height: "25px",
                minWidth: "300px",
              }}
            >
              {this.props.value}
            </span>
          )
        }
      </span>
    );
  }
}

export default ElementMaker;