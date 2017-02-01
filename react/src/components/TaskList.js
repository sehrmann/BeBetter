import React, { Component } from 'react';
import Task from './Task';
import TaskListHeader from './TaskListHeader';
import NewTaskForm from './NewTaskForm';

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      importances: [],
      periods: []
    }

    this.getTasks = this.getTasks.bind(this);
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
        let newTasks = body.tasks
        let newImportances = body.importances
        let newPeriods = body.periods
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

  render() {
    let tasks = this.state.tasks.map((task) => {
      return(
        < Task
          key = { task.id }
          id = { task.id }
          name = { task.name }
          reps = { task.reps }
          period = { task.period }
          value = { task.value }
        />
      )
    });

    return(
      <div className="small-10 columns">
        < TaskListHeader />
        < NewTaskForm
          importances = { this.state.importances }
          periods = { this.state.periods }
          getTasks = { this.getTasks }
        />
        { tasks }
      </div>
    )
  }
}

 export default TaskList;
