import React, { Component } from 'react';

class TaskFormButtonsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let deleteButton = null;
    if (this.props.selectedTask) {
      deleteButton = <button
        className="alert button"
        onClick={this.props.handleDelete}
      >
        {`Delete`}
      </button>
    }

    return(
      <div>
        <input
          type="submit"
          value={this.props.formButtonText}
          className="button"
        />
        {deleteButton}
      </div>
    )
  }
}

export default TaskFormButtonsContainer;
