import React, { Component } from 'react';
import Task from './Task';

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      showForm: false
    }
  }

  componentDidMount() {
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
        let newTasks = body
        this.setState({
          tasks: newTasks
        })
      });
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
        <div className="row">
          <div className="small-1 columns">
            <button className="button">{`+`}</button>
          </div>
          <div className="small-11 columns">
            <h3>Tasks</h3>
          </div>
        </div>
        { tasks }
      </div>
    )
  }
}

 export default TaskList;
