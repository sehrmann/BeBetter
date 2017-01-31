import React, { Component } from 'react';

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let howOften = ""
    if (this.props.reps === 1.0) {
      howOften = `${this.props.reps} time per ${this.props.period}`;
    } else {
      howOften = `${this.props.reps} times per ${this.props.period}`;
    }

    return(
      <div className="callout primary">
        <p>{ this.props.name }</p>
        <p>{ howOften }</p>
      </div>
    )
  }
}

export default Task;
