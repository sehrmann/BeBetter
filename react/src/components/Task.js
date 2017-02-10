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

    let name;
    if (this.props.name) {
      name = this.props.name;
      if (name.length > 40) {
        name = name.substring(0,20) + "...";
      }
    }

    let className = "small-12 medium-6 large-4 columns";
    if (this.props.last) {
      className = className + " end";
    }

    return(
      <div className={className}>
        <div className="callout primary">
          <div className="row">
            <div className="small-12 columns">
              <p>{ name }</p>
              <p>{ howOften }</p>
            </div>
            <div className="row">
              <div className="small-6 columns">
                <button className="button" onClick={this.props.handleFormClick}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
              </div>
              <div className="small-6 columns">
                <button className="success button" onClick={this.handleClick}>
                  {this.props.value}pts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Task;
