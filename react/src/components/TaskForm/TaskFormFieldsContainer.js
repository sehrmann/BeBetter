import React, { Component } from 'react';
import TaskFormSubmitButton from './TaskFormSubmitButton';
import TaskFormButton from './TaskFormButton';
import TaskFormTextField from './TaskFormTextField';
import TaskFormSelect from './TaskFormSelect';

class TaskFormFieldsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      importances: [],
      periods: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/tasks/importances_and_periods`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newImportances = body.importances;
      let newPeriods = body.periods;
      this.setState({
        importances: newImportances,
        periods: newPeriods
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let fields = this.props.formFields;

    let valueField = null;
    if (fields.taskImportance === "Custom (Advanced)") {
      valueField = < TaskFormTextField
        label = "Value:"
        name = "value"
        type = "number"
        value = { fields.taskValue }
        onChange = { this.props.onChange }
        attr = "taskValue"
      />
    }

    let deleteButton = null;
    if (this.props.selectedTask) {
      deleteButton = < TaskFormButton
      className = "alert button"
      onClick = { this.props.handleDelete }
      buttonText = "Delete"
      />
    }
    return(
      <form onSubmit={this.props.handleSubmit}>
        < TaskFormTextField
          label = "Name:"
          name = "name"
          type = "text"
          value = { fields.taskName }
          onChange = { this.props.onChange }
          attr = "taskName"
        />
        < TaskFormSelect
          label = "Importance:"
          name = "importance"
          value = { fields.taskImportance }
          onChange = { this.props.onChange }
          attr = "taskImportance"
          options = { this.state.importances }
        />
        {valueField}
        < TaskFormTextField
          label = "I want to do this "
          name = "reps"
          type = "number"
          value = { fields.taskReps }
          onChange = { this.props.onChange }
          attr = "taskReps"
        />
        < TaskFormSelect
          label = " times per "
          name = "period"
          value = { fields.taskPeriod }
          onChange = { this.props.onChange }
          attr = "taskPeriod"
          options = { this.state.periods }
        />
        < TaskFormSubmitButton
          formButtonText = { this.props.formButtonText }
        />
        {deleteButton}
      </form>
    )
  }
}

export default TaskFormFieldsContainer;
