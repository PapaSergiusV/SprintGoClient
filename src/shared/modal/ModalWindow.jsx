import React, { Component } from "react";

import { showWindow, hideWindow } from "../../libs/ModalAnimation.js";

import "./ModalWindow.module.scss";

// Props:
// open:  boolean - modal window is opened?
// close: func    - change open state in parent element state

const animationSpeed = 150;

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

  componentDidUpdate = (prevProps) => {
    if (!prevProps.open && this.props.open)
      this.showModal();
    else if (prevProps.open && !this.props.open)
      this.hideModal();
  }

  handleWrapperClick = (event) => {
    event.target === this.wrapper.current && this.props.close();
  }

  showModal = () => {
    showWindow(this.wrapper.current, animationSpeed, "flex");
  }

  hideModal = () => {
    hideWindow(this.wrapper.current, animationSpeed);
  }
}

export default ModalWindow;