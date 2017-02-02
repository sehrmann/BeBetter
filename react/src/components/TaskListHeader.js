import React, { Component } from 'react';

class TaskListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleCalculateGoal = this.handleCalculateGoal.bind(this);
  }

  handleCalculateGoal() {
    fetch(`/api/v1/users/${this.props.currentUser.id}/update_points_goal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin'
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
      .then(() => { this.props.getUserData(); })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className="row">
        <div className="small-2 text-right columns">
          <button
            className="button"
            data-open="new-task-form"
            onClick={this.props.handleNewFormClick}
          >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
            {' Add New'}
          </button>
        </div>
        <div className="small-2 columns">
          <button
            className="button"
            onClick={this.handleCalculateGoal}
          >
            {'Calculate Goal'}
          </button>
        </div>
        <div className="small-8 columns">
          <h3>Tasks</h3>
        </div>
      </div>
    )
  }
}

export default TaskListHeader;
