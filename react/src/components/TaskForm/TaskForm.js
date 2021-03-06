import React, { Component } from 'react';
import TaskFormHeader from './TaskFormHeader';
import TaskFormFieldsContainer from './TaskFormFieldsContainer';

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formFields: {},
      formHeader: "Add a New Task",
      formButtonText: "Submit",
      errors: []
    }

    this.onChange = this.onChange.bind(this);
    this.postPutOrDelete = this.postPutOrDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  defaultFormFields() {
    return({
      taskName: "",
      taskImportance: "Medium",
      taskValue: "",
      taskReps: "",
      taskPeriod: "Week"
    })
  }

  componentDidMount() {
    let editTask = this.props.selectedTask;
    let newFormHeader = "Add a New Task";
    let newFormButtonText = "Submit";
    let newFormFields = this.defaultFormFields();
    if (editTask) {
      newFormHeader = "Edit Task";
      newFormButtonText = "Edit";
      newFormFields = {
        taskName: editTask.name,
        taskImportance: editTask.importance,
        taskValue: editTask.value,
        taskReps: editTask.reps,
        taskPeriod: editTask.period
      }
    }
    this.setState({
      formHeader: newFormHeader,
      formButtonText: newFormButtonText,
      formFields: newFormFields
    });
  }

  onChange(attr, event) {
    let newAttr = event.target.value;
    let newFormFields = this.state.formFields;
    newFormFields[attr] = newAttr;
    this.setState({ formFields: newFormFields });
  }

  checkForErrors() {
    let errors = [];
    let fields = this.state.formFields;

    if (!fields.taskName) {
      errors.push("A task needs a name");
    }
    if (!fields.taskReps) {
      errors.push("You must specify how often you want to do this task");
    }
    if (fields.taskImportance == "Custom (Advanced)" && !fields.taskValue) {
      errors.push("You must specify a point value for this task");
    }

    return errors;
  }

  postPutOrDelete(method, data, taskId) {
    fetch(`/api/v1/tasks/${taskId}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: data
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
        if (this.props.closeOnSubmit) {
          this.props.handleCloseForm();
          this.props.getTasks();
        } else {
          let newErrors = [];
          this.setState({
            formHeader: "Add a New Task",
            formButtonText: "Submit",
            formFields: this.defaultFormFields(),
            errors: newErrors
          });
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.checkForErrors().length == 0) {
      let data = {
        task: {
          name: this.state.formFields.taskName,
          importance: this.state.formFields.taskImportance,
          value: this.state.formFields.taskValue,
          reps: this.state.formFields.taskReps,
          period: this.state.formFields.taskPeriod
        }
      }
      let jsonStringData = JSON.stringify(data);
      let method, taskId;
      if (this.props.selectedTask) {
        method = 'PUT';
        taskId = this.props.selectedTask.id;
      } else {
        method = 'post';
        taskId = "";
      }
      this.postPutOrDelete(method, jsonStringData, taskId);
    } else {
      let newErrors = this.checkForErrors();
      this.setState({ errors: newErrors });
    }
  }

  handleDelete(event) {
    if (confirm("Are you sure?")) {
      this.postPutOrDelete("DELETE", null, this.props.selectedTask.id);
    }
  }

  makeErrors() {
    let ii=0;
    if (this.state.errors.length > 0) {
      let errorFragment = this.state.errors.map((error) => {
        ii++;
        return(
          <p key={ii}>{error}</p>
        )
      });
      return(
        <div className="callout alert">
          {errorFragment}
        </div>
      );
    } else {
      return(null);
    }
  }

  render() {
    let errors = this.makeErrors();

    let closeButton;
    if (this.props.closeOnClick) {
      closeButton = <button className="close-button" onClick={this.props.handleCloseForm}>
        <span aria-hidden="true">&times;</span>
      </button>
    }

    return(
      <div className="row">
        <div className="small-12 columns">
          <div className="callout custom-modal">
            < TaskFormHeader
              formHeader = { this.state.formHeader }
              subheader = { this.props.subheader }
            />
            < TaskFormFieldsContainer
              onChange = { this.onChange }
              formFields = { this.state.formFields }
              importances = { this.props.importances }
              periods = { this.props.periods }
              selectedTask = { this.props.selectedTask }
              handleSubmit = { this.handleSubmit }
              handleDelete = { this.handleDelete }
              formButtonText = { this.state.formButtonText }
              buttons = { this.props.buttons }
            />
            {closeButton}
            {errors}
          </div>
        </div>
      </div>
    )
  }
}

export default TaskForm;
