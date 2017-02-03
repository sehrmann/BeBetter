import React, { Component } from 'react';

class TaskFormSelect extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
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
    let options = this.makeOptions(this.props.options);

    return(
      <label>
        {this.props.label}
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
        >
          {options}
        </select>
      </label>
    )
  }
}

export default TaskFormSelect;
