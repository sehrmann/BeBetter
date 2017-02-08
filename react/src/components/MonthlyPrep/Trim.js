import React, { Component } from 'react';
import TaskFormButton from '../TaskForm/TaskFormButton';
import TaskForm from '../TaskForm/TaskForm';
import TrimTask from './TrimTask';

class Trim extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      selectedTaskId: null,
      showForm: false
    }

    this.goToAddTasks = this.goToAddTasks.bind(this);
    this.handleFormClick = this.handleFormClick.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.findSelectedTask = this.findSelectedTask.bind(this);
  }

  goToAddTasks() {
    this.props.changeWalkthroughStep("AddTasks");
  }

  handleFormClick(id) {
    let newSelectedTaskId = id;
    let newShowForm = true;
    this.setState({
      selectedTaskId: newSelectedTaskId,
      showForm: newShowForm
    });
  }

  handleCloseForm() {
    let newSelectedTaskId = null;
    let newShowForm = false;
    this.setState({
      selectedTaskId: newSelectedTaskId,
      showForm: newShowForm
    });
  }

  getTasks() {
    fetch('/api/v1/tasks', {
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
        let newTasks = body.tasks;
        this.setState({
          tasks: newTasks,
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getTasks();
  }

  findSelectedTask() {
    for (let task of this.state.tasks) {
      if (task.id === this.state.selectedTaskId) {
        return(task);
      }
    }
    return(null);
  }

  render() {
    let tasks, form, content;
    let selectedTask = this.findSelectedTask();
    if (this.state.showForm) {
      form = < TaskForm
        id = "edit-task-form"
        getTasks = { this.getTasks }
        selectedTask = { selectedTask }
        closeOnSubmit = { true }
        closeOnClick = { false }
        handleCloseForm = { this.handleCloseForm }
      />
      content = form
    } else {
      tasks = this.state.tasks.map((task) => {
        let handleFormClick = () => {
          this.handleFormClick(task.id);
        }
        return(
          < TrimTask
            key = { task.id }
            name = { task.name }
            handleFormClick = { handleFormClick }
          />
        )
      });
      content = <div className="callout custom-modal" id="trim">
        <h1>{"Edit or Remove Tasks"}</h1>
        {tasks}
        < TaskFormButton
          className = "button float-right"
          onClick = { this.goToAddTasks }
          buttonText = "Done"
        />
      </div>
    }

    return(
      <div className="custom-modal-overlay">
        {content}
      </div>
    )
  }
}

export default Trim;
