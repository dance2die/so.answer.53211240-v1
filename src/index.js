import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const cloneEvent = event => new event.constructor(event.type, event);

const clickHandler = (type, forwardTo) => event => {
  console.log(type, "was clicked");
  if (forwardTo) forwardTo.dispatchEvent(cloneEvent(event));
};

class App extends Component {
  buttonA = createRef();
  buttonB = createRef();

  componentDidMount() {
    this.buttonA.current.addEventListener(
      "click",
      clickHandler("A", this.buttonB.current)
    );
    this.buttonA.current.addEventListener("click", clickHandler("B"));
  }

  componentWillUnmount() {
    this.buttonA.current.current.removeEventListener(
      "click",
      clickHandler("A", this.buttonB.current)
    );
    this.buttonA.removeEventListener("click", clickHandler("B"));
  }

  render() {
    return (
      <div className="App">
        <button ref={this.buttonA}>Button A</button>
        <button ref={this.buttonB}>Button B</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
