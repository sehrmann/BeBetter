import React, { Component } from 'react';
import TaskFormButtonsContainer from './TaskFormButtonsContainer';

class TaskFormFieldsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleImportanceChange = this.handleImportanceChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleNameChange(event) { this.props.onChange( "taskName", event) }
  handleRepsChange(event) { this.props.onChange( "taskReps", event) }
  handleImportanceChange(event) { this.props.onChange( "taskImportance", event) }
  handlePeriodChange(event) { this.props.onChange( "taskPeriod", event) }
  handleValueChange(event) { this.props.onChange( "taskValue", event) }

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
    debugger;
    let fields = this.props.formFields;
    let importanceOptions = this.makeOptions(this.props.importances);
    let periodOptions = this.makeOptions(this.props.periods);

    let valueField = null;
    if (fields.taskImportance === "Custom (Advanced)") {
      valueField = <label>
        {`Value:`}
        <input
          name="value"
          type="number"
          value={fields.taskValue}
          onChange={this.handleValueChange}
        />
      </label>
    }

    let deleteButton = null;
    if (this.props.selectedTask) {
      deleteButton = <button
        className="alert button"
        onClick={this.props.handleDelete}
      >
        {`Delete`}
      </button>
    }

    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          {`Name:`}
          <input
            name="name"
            type="text"
            value={fields.taskName}
            onChange={this.handleNameChange}
          />
        </label>
        <label>
          {`Importance:`}
          <select
            name="importance"
            value={fields.taskImportance}
            onChange={this.handleImportanceChange}
          >
            {importanceOptions}
          </select>
        </label>
        {valueField}
        <label>
          {`I want to do this `}
          <input
            name="reps"
            type="number"
            value={fields.taskReps}
            onChange={this.handleRepsChange}
          />
          {` times per `}
          <select
            name="period"
            value={fields.taskPeriod}
            onChange={this.handlePeriodChange}
          >
            {periodOptions}
          </select>
        </label>
        <input
          type="submit"
          value={this.props.formButtonText}
          className="button"
        />
        {deleteButton}
      </form>
    )
  }
}

export default TaskFormFieldsContainer;
