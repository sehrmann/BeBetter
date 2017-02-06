import React, { Component } from 'react';

class TaskFormTextField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { this.props.onChange(this.props.attr, event) }

  render() {
    return(
      <label>
        {this.props.label}
        <input
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.handleChange}
        />
      </label>
    )
  }
}

export default TaskFormTextField;
