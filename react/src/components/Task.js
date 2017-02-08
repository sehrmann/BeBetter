import React, { Component } from 'react';

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let newPoints = this.props.currentUser.current_points + this.props.value;
    let data = {
      user: {
        current_points: newPoints
      }
    }
    let jsonStringData = JSON.stringify(data);

    fetch(`/api/v1/users/${this.props.currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: jsonStringData
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
    let howOften = ""
    if (this.props.reps === 1.0) {
      howOften = `${this.props.reps} time per ${this.props.period}`;
    } else {
      howOften = `${this.props.reps} times per ${this.props.period}`;
    }

    return(
      <div className="callout primary small-12 medium-6 large-4 columns">
        <div className="row">
          <div className="small-8 columns">
            <p>{ this.props.name }</p>
            <p>{ howOften }</p>
            <button className="button" onClick={this.props.handleFormClick}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>
          <div className="small-4 columns">
            <button className="success button" onClick={this.handleClick}>
              {this.props.value}pts
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Task;
