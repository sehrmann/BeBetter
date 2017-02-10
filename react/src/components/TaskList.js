import React, { Component } from 'react';
import Task from './Task';
import TaskListHeader from './TaskListHeader';
import TaskForm from './TaskForm/TaskForm';

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      selectedTaskId: null,
      showForm: false
    }

    this.handleFormClick = this.handleFormClick.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.findSelectedTask = this.findSelectedTask.bind(this);
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
    let newShowForm = false;
    this.setState({ showForm: newShowForm });
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

  componentWillReceiveProps(newProps) {
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

    let selectedTask = this.findSelectedTask();

    let form;
    if (this.state.showForm) {
      form = <div className="custom-modal-overlay">
        < TaskForm
          id = "new-task-form"
          getTasks = { this.getTasks }
          selectedTask = { selectedTask }
          closeOnSubmit = { true }
          closeOnClick = { true }
          handleCloseForm = { this.handleCloseForm }
        />
      </div>
    }

    return(
      <div className="small-10 columns">
        < TaskListHeader
          handleNewFormClick = { handleNewFormClick }
          getUserData = { this.props.getUserData }
          currentUser = { this.props.currentUser }
        />
        { form }
        <div className="row">
          { tasks }
        </div>
      </div>
    )
  }
}

 export default TaskList;
