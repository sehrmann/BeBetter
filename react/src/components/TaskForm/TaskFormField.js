import React, { Component } from 'react';

class TaskFormField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) { this.props.onChange(this.props.attr, event) }

  makeOptions(optionsArray) {
    let returnOptions, ii;
    ii=0;
    if (optionsArray) {
      returnOptions = optionsArray.map((option) => {
        ii++;
        return(
          <option key={ii} value={option}>{option}</option>
        )
      });
    }
    return(returnOptions);
  }

  render() {

    let field = null;
    if (this.props.type === "text" || this.props.type === "number") {
      field = <label>
        {this.props.label}
        <input
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.handleChange}
        />
      </label>
    } else if (this.props.type === "select") {
      let options = this.makeOptions(this.props.options)
      field = <label>
        {this.props.label}
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
        >
          {options}
        </select>
      </label>
    }
    return(
      {field}
    )
  }
}

export default TaskFormField;
