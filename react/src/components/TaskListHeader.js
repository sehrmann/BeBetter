import React, { Component } from 'react';
import CalculateGoalButton from './CalculateGoalButton';

class TaskListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
          < CalculateGoalButton
            currentUser = { this.props.currentUser }
            getUserData = { this.props.getUserData }
          />
        </div>
        <div className="small-8 columns">
          <h3>Tasks</h3>
        </div>
      </div>
    )
  }
}

export default TaskListHeader;
