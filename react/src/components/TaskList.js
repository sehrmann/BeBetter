import React, { Component } from 'react';
import Task from './Task';
import TaskListHeader from './TaskListHeader';
import TaskForm from './TaskForm/TaskForm';

class TaskList extends Component {
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
        let newImportances = body.importances;
        let newPeriods = body.periods;
        this.setState({
          tasks: newTasks,
          importances: newImportances,
          periods: newPeriods
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
        < Task
          key = { task.id }
          id = { task.id }
          name = { task.name }
          reps = { task.reps }
          period = { task.period }
          value = { task.value }
          handleFormClick = { handleFormClick }
          currentUser = { this.props.currentUser }
          getUserData = { this.props.getUserData }
        />
      )
    });

    let handleNewFormClick = () => {
      return(this.handleFormClick(null));
    }

    let selectedTask = this.findSelectedTask()

    return(
      <div className="small-10 columns">
        < TaskListHeader
          handleNewFormClick = { handleNewFormClick }
          getUserData = { this.props.getUserData }
          currentUser = { this.props.currentUser }
          getUserData = { this.props.getUserData }
        />
        < TaskForm
          id = "new-task-form"
          getTasks = { this.getTasks }
          selectedTask = { selectedTask }
          closeOnSubmit = { true }
          closeOnClick = { true }
          closeOnEsc = { true }
        />
        { tasks }
      </div>
    )
  }
}

 export default TaskList;
