import React, { Component } from 'react';

class TaskListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="row">
        <div className="small-1 text-right columns">
          <button
            className="button"
            data-open="new-task-form"
            onClick={this.props.handleNewFormClick}
          >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
          </button>
        </div>
        <div className="small-11 columns">
          <h3>Tasks</h3>
        </div>
      </div>
    )
  }
}

export default TaskListHeader;