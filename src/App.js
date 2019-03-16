import React, { Component } from "react";
import CardGrid from "./CardGrid";
import Winner from "./Winner";
import "./App.css";

class App extends Component {
  state = {
    won: false
  };

  handleWin = () => {
    this.setState({ won: true });
  };

  render() {
    return (
      <div>
        <CardGrid onWin={this.handleWin} />
        {this.state.won && <Winner />}
      </div>
    );
  }
}

export default App;
