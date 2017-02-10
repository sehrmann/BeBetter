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
        <div className="small-12 columns">
          <div className="row">
            <h3>Tasks</h3>
          </div>
          <div className="row">
            <div className="button-group">
            < CalculateGoalButton
              currentUser = { this.props.currentUser }
              getUserData = { this.props.getUserData }
            />
            <button
              className="button"
              onClick={this.props.handleNewFormClick}
            >
              <i className="fa fa-plus-square" aria-hidden="true"></i>
              {' Add New'}
            </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskListHeader;
