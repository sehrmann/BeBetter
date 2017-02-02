import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Goals from './Goals';
import TaskList from './TaskList';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null
    }

    this.getUserData = this.getUserData.bind(this);
  }

  getUserData() {
    fetch(`/api/v1/users/fetch_current_user`, {
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
      let newCurrentUser = body;
      this.setState({ currentUser: newCurrentUser })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return(
      <div className="expanded row">
        < Sidebar />
        < Goals
          currentUser = { this.state.currentUser }
        />
        < TaskList
          currentUser = { this.state.currentUser }
          getUserData = { this.getUserData }
        />
      </div>
    )
  }
}

export default Dashboard;
