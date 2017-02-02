import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  calculatePercentage() {
    let percentage = 100*this.props.current/this.props.goal;
    return(percentage > 100 ? 100 : percentage)
  }

  render() {
    return(
      <div>
        <h1>{`${this.props.current}/${this.props.goal}`} pts</h1>
        <h1>{parseInt(this.calculatePercentage())}%</h1>
      </div>
    )
  }
}

export default ProgressBar;
