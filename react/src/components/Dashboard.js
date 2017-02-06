import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Goals from './Goals';
import TaskList from './TaskList';
import Welcome from './MonthlyPrep/Welcome';
import Summary from './MonthlyPrep/Summary';
import Prep from './MonthlyPrep/Prep';
import Trim from './MonthlyPrep/Trim';
import AddTasks from './MonthlyPrep/AddTasks';
import MonthlyGoal from './MonthlyPrep/MonthlyGoal';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      hasTasks: true,
      newMonth: false
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
      let newCurrentUser = body.user;
      let newHasTasks = body.hasTasks;
      let newNewMonth = body.newMonth
      this.setState({
        currentUser: newCurrentUser,
        hasTasks: newHasTasks,
        newMonth: newNewMonth
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    if (!this.state.hasTasks) {
      $('#welcome').foundation('open');
    }

    if (this.state.newMonth) {
      $('#summary').foundation('open');
    }

    return(
      <div className="expanded row">
        < Sidebar />
        < Goals
          currentUser = { this.state.currentUser }
        />
        < Welcome />
        < Summary
          currentUser = { this.state.currentUser }
          getUserData = { this.getUserData }
        />
        < Prep
          currentUser = { this.state.currentUser }
          getUserData = { this.getUserData }
        />
        < Trim />
        < AddTasks />
        < MonthlyGoal
          currentUser = { this.state.currentUser }
          getUserData = { this.getUserData }
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
