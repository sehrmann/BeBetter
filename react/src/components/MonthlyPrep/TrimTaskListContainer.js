import React, { Component } from 'react';
import TrimTask from './TrimTask';
import TaskForm from '../TaskForm/TaskForm';

class TrimTaskListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      selectedTaskId: null
    }

    this.handleFormClick = this.handleFormClick.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.findSelectedTask = this.findSelectedTask.bind(this);
  }

  handleFormClick(id) {
    let newSelectedTaskId = id;
    this.setState({ selectedTaskId: newSelectedTaskId });
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
    let tasks = this.state.tasks.map((task) => {
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

    let selectedTask = this.findSelectedTask();

    return(
      <div>
        {tasks}
        < TaskForm
          id = "edit-task-form"
          getTasks = { this.getTasks }
          selectedTask = { selectedTask }
          closeOnSubmit = { false }
          closeOnClick = { false }
          closeOnEsc = { false }
          returnToPrep = { true }
        />
      </div>
    )
  }
}

export default TrimTaskListContainer;
