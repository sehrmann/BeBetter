import React, { Component } from 'react';

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: "",
      taskImportance: "Medium",
      taskValue: "",
      taskReps: "",
      taskPeriod: "Day"
    }

    this.onChange = this.onChange.bind(this);
    this.handleImportanceChange = this.handleImportanceChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(attr, event) {
    let newAttr = event.target.value;
    let newState = {};
    newState[attr] = newAttr;
    this.setState(newState);
  }

  handleNameChange(event) { this.onChange( "taskName", event) }
  handleRepsChange(event) { this.onChange( "taskReps", event) }
  handleImportanceChange(event) { this.onChange( "taskImportance", event) }
  handlePeriodChange(event) { this.onChange( "taskPeriod", event) }
  handleValueChange(event) { this.onChange( "taskValue", event) }

  handleSubmit(event) {
    event.preventDefault();
    debugger;
    let data = {
      task: {
        name: this.state.taskName,
        importance: this.state.taskImportance,
        value: this.state.taskValue,
        reps: this.state.taskReps,
        period: this.state.taskPeriod
      }
    }
    let jsonStringData = JSON.stringify(data);

    fetch('/api/v1/tasks', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: jsonStringData
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => {
        this.setState({
          taskName: "",
          taskImportance: "Medium",
          taskValue: "",
          taskReps: "",
          taskPeriod: "Day"
        });
      })
      .then(() => {
        this.props.getTasks();
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

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
    let importanceOptions = this.makeOptions(this.props.importances);
    let periodOptions = this.makeOptions(this.props.periods);
    let value = null;
    if (this.state.taskImportance === "Custom (Advanced)") {
      value = <label>
        {`Value:`}
        <input
          name="value"
          type="number"
          value={this.state.taskValue}
          onChange={this.handleValueChange}
        />
      </label>
    }

    return(
      <div className="reveal" id="new-task-form" data-reveal>
        <h3>{`Add New Task`}</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            {`Name:`}
            <input
              name="name"
              type="text"
              value={this.state.taskName}
              onChange={this.handleNameChange}
            />
          </label>
          <label>
            {`Importance:`}
            <select
              name="importance"
              value={this.state.taskImportance}
              onChange={this.handleImportanceChange}
            >
              {importanceOptions}
            </select>
          </label>
          {value}
          <label>
            {`I want to do this `}
            <input
              name="reps"
              type="number"
              value={this.state.taskReps}
              onChange={this.handleRepsChange}
            />
            {` times per `}
            <select
              name="period"
              value={this.state.taskPeriod}
              onChange={this.handlePeriodChange}
            >
              {periodOptions}
            </select>
          </label>
          <input
            type="submit"
            className="button"
            data-close="new-task-form"
          />
        </form>
        <button className="close-button" data-close="new-task-form">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

export default NewTaskForm
