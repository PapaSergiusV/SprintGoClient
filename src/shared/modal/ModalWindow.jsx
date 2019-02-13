import React, { Component } from "react";

import { showWindow, hideWindow } from "../../libs/ModalAnimation.js";

import "./ModalWindow.module.scss";

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  render() {
    return (
      <div ref={this.wrapper} className="wrapper" onClick={this.handleWrapperClick}>
        <div className="modal">
          {
            React.Children.map(
              this.props.children,
              child => React.cloneElement(child, { close: this.hideModal })
            )
          }
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    this.wrapper.current.style.display = "none";
  }

  handleWrapperClick = (event) => {
    event.target === this.wrapper.current && this.hideModal();
  }

  showModal = () => {
    showWindow(this.wrapper.current);
  }

  hideModal = () => {
    hideWindow(this.wrapper.current);
  }
}

export default ModalWindow;